/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

const {
  Sale,
  Invoice,
  Customer,
  Staff,
  InvoiceItem,
  Payment,
  Receipt,
  Bank,
} = require('../../database/models');

const { Op } = Sequelize;

/**
 * query sales by id
 *
 * @function
 * @returns {json} json object with sale data
 * @param data
 */
export async function getSaleById(data) {
  return Sale.findByPk(data);
}

/**
 * query sales by invoice id
 *
 * @function
 * @returns {json} json object with sale data
 * @param data
 */
export async function getSaleByInvoiceId(data) {
  return Sale.findOne({ where: { ivid: data }, attributes: ['discount'] });
}

/**
 * query one sale
 *
 * @function
 * @returns {json} json object with sale data
 * @param data
 */
export async function getOneSale(data) {
  return Sale.findOne({
    where: { slid: data },
    include: [
      { model: Customer },
      { model: Payment },
      { model: Staff },
      { model: Receipt },
      { model: Invoice, include: [{ model: InvoiceItem }] },
    ],
  });
}

/**
 * update sale
 *
 * @function
 * @returns {json} json object with sale data
 * @param data
 */
export async function updateSale(data) {
  const sale = await getSaleById(data.slid);
  return sale.update(data);
}

/**
 * update sale
 *
 * @function
 * @returns {json} json object with sale data
 * @param discount
 * @param discountAmount
 * @param sale
 */
export async function applyDiscount({ discount, discountAmount, sale }) {
  return sale.update({ discount, amount_due: discountAmount, amount_remaining: discountAmount });
}

/**
 * get sales
 *
 * @function
 * @returns {json} json object with sales data
 * @param currentPage
 * @param pageLimit
 */
export async function getSales(currentPage = 1, pageLimit = 10) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }, { model: Invoice }],
  });
}

/**
 * get sales
 *
 * @function
 * @returns {json} json object with sales data
 * @param currentPage
 * @param pageLimit
 */
export async function getPendingSales(currentPage = 1, pageLimit = 10) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }, { model: Invoice }],
    where: {
      status: {
        [Op.not]: 'Paid',
      },
    },
  });
}

/**
 * filter sales
 *
 * @function
 * @returns {json} json object with sales data
 * @param currentPage
 * @param pageLimit
 * @param filter
 */
export async function filterSales(currentPage = 1, pageLimit = 10, filter) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }, { model: Invoice }],
    where: {
      status: filter,
    },
  });
}

/**
 * get a staff sales
 *
 * @function
 * @returns {json} json object with sales data
 * @param currentPage
 * @param pageLimit
 * @param data
 */
export async function getStaffSales(currentPage = 1, pageLimit = 10, data) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }, { model: Invoice }],
    where: {
      sid: data,
      status: {
        [Op.not]: 'Pending',
      },
    },
  });
}

/**
 * debtors
 *
 * @function
 * @returns {json} json object with debtors data
 * @param currentPage
 * @param pageLimit
 */
export async function debtors(currentPage = 1, pageLimit = 10) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }, { model: Invoice }],
    where: {
      status: {
        [Op.not]: 'Paid',
      },
    },
  });
}

/**
 * get debtors a staff created
 *
 * @function
 * @returns {json} json object with debtors data
 * @param currentPage
 * @param pageLimit
 * @param data
 */
export async function staffDebtors(currentPage = 1, pageLimit = 10, data) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }, { model: Invoice }],
    where: {
      sid: data,
      status: {
        [Op.not]: 'Paid',
      },
    },
  });
}

/**
 * search sales
 *
 * @function
 * @returns {json} json object with sales data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchSales(currentPage = 1, pageLimit = 10, search) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Customer,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
      },
      { model: Invoice },
    ],
  });
}

/**
 * create payment
 *
 * @function
 * @returns {json} json object with sale data
 * @param data
 */
export async function createPayment(data) {
  const { sid, slid, bank, payment_method, amount, label, date_of_payment } = data;
  const sale = await getSaleById(slid);
  return Payment.create({
    sid,
    label,
    slid,
    ivid: sale.ivid,
    bank,
    payment_method,
    amount,
    date_of_payment,
  });
}

/**
 * generate a receipt
 *
 * @function
 * @returns {json} json object with receipt data
 * @param data
 */
export async function generateReceipt(data) {
  return Receipt.create({
    sid: data.sid,
    slid: data.slid,
    ptid: data.ptid,
  });
}

/**
 * search payments
 *
 * @function
 * @returns {json} json object with payments data
 * @param currentPage
 * @param pageLimit
 * @param search
 * @param start
 * @param end
 */
export async function searchPayments(currentPage = 1, pageLimit = 10, search, start, end) {
  return Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [
      { model: Invoice, include: [{ model: Customer }] },
      { model: Bank, attributes: ['bank_name'] },
    ],
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
      [Op.or]: [
        {
          bank: {
            [Op.like]: `%${search}%`,
          },
          payment_method: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });
}

/**
 * search payments
 *
 * @function
 * @returns {json} json object with payments data
 * @param currentPage
 * @param pageLimit
 * @param start
 * @param end
 */
export async function getPayments(currentPage = 1, pageLimit = 10, start, end) {
  return Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [
      { model: Invoice, include: [{ model: Customer }] },
      { model: Bank, attributes: ['bank_name'] },
    ],
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
  });
}

/**
 * query one payment
 *
 * @function
 * @returns {json} json object with payment data
 * @param data
 */
export async function getOnePayment(data) {
  return Payment.findOne({
    where: { ptid: data },
    include: [{ model: Invoice, include: [{ model: Customer }, { model: InvoiceItem }] }],
  });
}
