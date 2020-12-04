/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import SettingInterface from '../../helpers/contants';
import { generateId } from '../../helpers/helper';
import { getSettingByName } from '../Utility/utilityRepository';
import { getSaleByInvoiceId } from '../Sale/saleRepository';

const { Invoice, Staff, Customer, InvoiceItem, Sale, Waybill } = require('../../database/models');

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
 * @param vatPrice
 */
export async function createInvoice(data, vatPrice = 0) {
  const { name, cid, invoice_type, product, sid } = data;
  const result = await db.sequelize.transaction(async t => {
    const invoice = await Invoice.create(
      {
        name,
        cid,
        invoice_type,
        sid,
        vat: vatPrice,
        invoice_numb:
          invoice_type === 'proforma invoice'
            ? `TPL/PRV/${generateId((await invoiceCount()) + 1, 4)}`
            : `TPL/INV/${generateId((await invoiceCount()) + 1, 4)}`,
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
  const vat = await getSettingByName(SettingInterface.VAT);
  const sale = await getSaleByInvoiceId(data);

  const invoice = await Invoice.findOne({
    where: { ivid: data },
    include: [
      { model: Staff, attributes: { exclude: ['password'] } },
      { model: Customer },
      { model: InvoiceItem },
    ],
  });

  return {
    invoice,
    VAT: vat.value,
    discount: sale.discount,
  };
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
    include: [{ model: Customer }],
  });
}

/**
 * filter invoices
 *
 * @function
 * @returns {json} json object with invoices data
 * @param currentPage
 * @param pageLimit
 * @param filter
 */
export async function filterInvoices(currentPage = 1, pageLimit = 10, filter) {
  return Invoice.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }],
    where: {
      [Op.or]: [
        {
          is_approved: filter,
        },
        {
          invoice_type: filter,
        },
      ],
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
    include: [{ model: Customer }],
    where: {
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
 * approve invoice
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 */
export async function approveInvoice(data) {
  const invoice = await getInvoiceById(data.invoice_id);
  return invoice.update({ is_approved: 1 });
}

/**
 * decline invoice
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 */
export async function declineInvoice(data) {
  const invoice = await getInvoiceById(data.invoice_id);
  return invoice.update({ comment: data.comment, is_approved: 2 });
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
    amount_remaining: Number(sum[0].total) + data.vat,
    ivid: data.ivid,
    amount_due: Number(sum[0].total) + data.vat,
    amount_paid: 0,
    cid: data.cid,
    sid: data.sid,
  });
}

// /**
//  * stepped down invoice
//  *
//  * @function
//  * @returns {json} json object with invoice data
//  * @param data
//  */
// export async function steppedDownInvoice(data) {
//   const invoice = await Invoice.create({
//     name: data.name,
//     cid: data.cid,
//     invoice_type: 'invoice',
//     sid: data.sid,
//     vat: data.vatPrice,
//     invoice_numb: `TPL/INV/${generateId((await invoiceCount()) + 1, 4)}`,
//   });
//
//   const items = product.map(detail => ({
//     item: detail.item,
//     item_id: detail.item_id,
//     price: detail.price,
//     quantity: detail.quantity,
//     ivid: invoice.ivid,
//   }));
//
//   await InvoiceItem.bulkCreate(items, { transaction: t });
//   return invoice;
// }

/**
 * stepdown invoice
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 */
export async function stepDownInvoice(data) {
  return db.sequelize.transaction(async t => {
    const invoice = await getInvoiceById(data.invoice_id);
    const inv = await invoice.update(
      {
        has_step_down: 1,
        invoice_type: 'invoice',
        invoice_numb: `TPL/INV/${generateId((await invoiceCount()) + 1, 4)}`,
      },
      { transaction: t }
    );

    const sum = await getSumOfItems(inv);

    await createSale(sum, inv);

    return inv;
  });
}

/**
 * count number of waybill generated
 *
 * @function
 * @returns {json} json number with waybill count
 */
export async function waybillCount() {
  return Waybill.count();
}

/**
 * create waybill in the DB
 *
 * @function
 * @returns {json} json object with waybill data
 * @param data
 */
export async function createWaybill(data) {
  const { driver_phone, cid, driver_name, vehicle_numb, sid, ivid, name } = data;
  return Waybill.create({
    waybill_numb: `TPL/WYB/${generateId((await waybillCount()) + 1, 4)}`,
    driver_name,
    driver_phone,
    cid,
    sid,
    vehicle_numb,
    ivid,
    name,
  });
}

/**
 * search waybill
 *
 * @function
 * @returns {json} json object with waybill data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchWaybill(currentPage = 1, pageLimit = 10, search) {
  return Waybill.paginate({
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
    ],
  });
}

/**
 * get waybills
 *
 * @function
 * @returns {json} json object with waybills data
 * @param currentPage
 * @param pageLimit
 */
export async function getWaybills(currentPage = 1, pageLimit = 10) {
  return Waybill.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Customer }],
  });
}

/**
 * get one waybills
 *
 * @function
 * @returns {json} json object with waybill data
 * @param data
 */
export async function getOneWaybill(data) {
  return Waybill.findOne({
    where: { wyid: data },
    order: [['createdAt', 'DESC']],
    include: [
      { model: Customer },
      { model: Staff },
      { model: Invoice, include: [{ model: InvoiceItem }] },
    ],
  });
}

/**
 * query waybill account in the DB by waybill id
 *
 * @function
 * @returns {json} json object with waybill data
 * @param data
 */
export async function getWaybillById(data) {
  return Waybill.findByPk(data);
}

/**
 * update waybill
 *
 * @function
 * @returns {json} json object with waybill data
 * @param data
 */
export async function updateWaybill(data) {
  const waybill = await getWaybillById(data.wyid);
  return waybill.update(data);
}
