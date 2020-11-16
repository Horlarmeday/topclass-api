import { Sequelize } from 'sequelize';

const { Invoice, Staff, Customer } = require('../../database/models');

const { Op } = Sequelize;

/**
 * create invoice in the DB
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 */
export async function createInvoice(data) {
  return Invoice.create(data);
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
    include: [{ model: Staff, attributes: { exclude: ['password'] } }, { model: Customer }],
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
    where: {
      invoice_type: filter,
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
