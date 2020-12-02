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
} = require('../../database/models');

const { Op } = Sequelize;

// /**
//  * create a sale
//  *
//  * @function
//  * @returns {json} json object with sale data
//  * @param data
//  */
// export async function createService(data) {
//   return Sale.create(data);
// }

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
  const service = await getSaleById(data.slid);
  return service.update(data);
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
    },
  });
}

/**
 * creditors
 *
 * @function
 * @returns {json} json object with creditors data
 * @param currentPage
 * @param pageLimit
 */
export async function creditors(currentPage = 1, pageLimit = 10) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }, { model: Invoice }],
    where: {
      [Op.or]: [
        {
          status: 'Partial',
        },
        {
          status: 'Pending',
        },
      ],
    },
  });
}

/**
 * get creditors a staff created
 *
 * @function
 * @returns {json} json object with creditors data
 * @param currentPage
 * @param pageLimit
 * @param data
 */
export async function staffCreditors(currentPage = 1, pageLimit = 10, data) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }, { model: Invoice }],
    where: {
      sid: data,
      [Op.or]: [
        {
          status: 'Partial',
        },
        {
          status: 'Pending',
        },
      ],
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
  const { sid, slid, bank, payment_method, amount } = data;
  const sale = await getSaleById(slid);
  return Payment.create({
    sid,
    slid,
    ivid: sale.ivid,
    bank,
    payment_method,
    amount,
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
