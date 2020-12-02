/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

import { generateId } from '../../helpers/helper';

const { Invoice, Staff, Customer, InvoiceItem, Sale } = require('../../database/models');

const { Op } = Sequelize;
const db = require('../../database/models/index');

/**
 * count number of invoice generated
 *
 * @function
 * @returns {json} json object with invoice data
 */
export async function invoiceCount() {
  return Invoice.count();
}

/**
 * create invoice in the DB
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 */
export async function createInvoice(data) {
  const { name, cid, invoice_type, product, sid } = data;
  const result = await db.sequelize.transaction(async t => {
    const invoice = await Invoice.create(
      {
        name,
        cid,
        invoice_type,
        sid,
        invoice_numb: `TPL/INV/${generateId((await invoiceCount()) + 1, 4)}`,
      },
      { transaction: t }
    );

    const items = product.map(detail => ({
      item: detail.item,
      item_id: detail.item_id,
      price: detail.price,
      quantity: detail.quantity,
      ivid: invoice.ivid,
    }));

    await InvoiceItem.bulkCreate(items, { transaction: t });
    return invoice;
  });
  return result;
}

/**
 * query invoice account in the DB by invoice id
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 */
export async function getInvoiceById(data) {
  return Invoice.findByPk(data);
}

/**
 * query invoice account in the DB by invoice id
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 */
export async function getOneInvoice(data) {
  return Invoice.findOne({
    where: { ivid: data },
    include: [
      { model: Staff, attributes: { exclude: ['password'] } },
      { model: Customer },
      { model: InvoiceItem },
    ],
  });
}

/**
 * update invoice
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 */
export async function updateInvoice(data) {
  const invoice = await getInvoiceById(data.ivid);
  return invoice.update(data);
}

/**
 * delete invoice
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 */
export async function deleteInvoice(data) {
  const invoice = await getInvoiceById(data);
  return invoice.destroy({ force: true });
}

/** *********************
/// ACCOUNTANT DASHBOARD
/*************************

/**
 * get invoices
 *
 * @function
 * @returns {json} json object with invoices data
 * @param currentPage
 * @param pageLimit
 */
export async function getInvoices(currentPage = 1, pageLimit = 10) {
  return Invoice.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      is_approved: 1,
    },
  });
}

/**
 * search invoices
 *
 * @function
 * @returns {json} json object with invoices data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchInvoices(currentPage = 1, pageLimit = 10, search) {
  return Invoice.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      is_approved: 1,
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          invoice_type: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
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
export async function getSales(currentPage = 1, pageLimit = 10) {
  return Sale.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }, { model: Invoice }],
    where: {
      [Op.ne]: {
        status: 'Paid',
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
    where: {
      [Op.ne]: {
        status: 'Paid',
      },
    },
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
 * sum of items
 *
 * @function
 * @returns {json} json object with items total data
 * @param data
 */
export async function getSumOfItems(data) {
  return InvoiceItem.findAll({
    where: { ivid: data.ivid },
    attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'total']],
    raw: true,
  });
}

/**
 * create sale
 *
 * @function
 * @returns {json} json object with invoice data
 * @param sum
 * @param data
 */
export async function createSale(sum, data) {
  return Sale.create({
    amount_remaining: sum[0].total,
    ivid: data.ivid,
    amount_due: sum[0].total,
    amount_paid: 0,
    cid: data.cid,
    sid: data.sid,
  });
}
