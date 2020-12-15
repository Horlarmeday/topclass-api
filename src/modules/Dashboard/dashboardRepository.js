/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

const { Invoice, Payment, Customer, Asset, Sale, Waybill, DispenseHistory } = require('../../database/models');

const { Op } = Sequelize;
// const db = require('../../database/models/index');

/**
 * accountant estimated card figures
 *
 * @function
 * @returns {json} json object with card data
 */
export async function accountantCard() {
  const customers = Customer.count();
  const steppedDownInvoice = Invoice.count({ where: { has_step_down: 1 } });
  const assets = Asset.count();
  const revenue = Payment.sum('amount');

  const [customerCount, invoiceCount, assetsCount, generatedAmount] = await Promise.all([
    customers,
    steppedDownInvoice,
    assets,
    revenue,
  ]);

  return {
    customerCount,
    invoiceCount,
    assetsCount,
    generatedAmount,
  };
}

/**
 *superadmin  estimated card figures
 *
 * @function
 * @returns {json} json object with card data
 */
export async function superAdminCard() {
  const customers = Customer.count();
  const sales = Sale.count();
  const debtors = Sale.count({ where: { [Op.not]: { status: 'Paid' } } });
  const revenue = Payment.sum('amount');

  const [customerCount, salesCount, debtorsCount, generatedAmount] = await Promise.all([
    customers,
    sales,
    debtors,
    revenue,
  ]);

  return {
    customerCount,
    salesCount,
    debtorsCount,
    generatedAmount,
  };
}

/**
 * admin estimated card figures
 *
 * @function
 * @returns {json} json object with card data
 */
export async function adminCard() {
  const customers = Customer.count();
  const sales = Sale.count();
  const invoice = Invoice.count();
  const revenue = Payment.sum('amount');

  const [customerCount, salesCount, invoiceCount, generatedAmount] = await Promise.all([
    customers,
    sales,
    invoice,
    revenue,
  ]);

  return {
    customerCount,
    salesCount,
    invoiceCount,
    generatedAmount,
  };
}

/**
 * secretary estimated card figures
 *
 * @function
 * @returns {json} json object with card data
 */
export async function secretaryCard(data) {
  const customers = Customer.count();
  const invoice = Invoice.count({ where: { sid: data } });
  const assets = Asset.count();

  const [customerCount, invoiceCount, assetsCount] = await Promise.all([
    customers,
    invoice,
    assets,
  ]);

  return {
    customerCount,
    invoiceCount,
    assetsCount,
  };
}

/**
 * storekeeper estimated card figures
 *
 * @function
 * @returns {json} json object with card data
 */
export async function storeKeeperCard(data) {
  const customers = Customer.count();
  const invoice = Invoice.count({ where: { sid: data } });
  const waybill = Waybill.count({ where: { sid: data } });
  const history = DispenseHistory.count({ where: { sid: data } });

  const [customerCount, invoiceCount, waybillCount, historyCount] = await Promise.all([
    customers,
    invoice,
    waybill,
    history,
  ]);

  return {
    customerCount,
    invoiceCount,
    waybillCount,
    historyCount,
  };
}

/**
 * storekeeper estimated card figures
 *
 * @function
 * @returns {json} json object with card data
 */
export async function workshopCard(data) {
  const customers = Customer.count();
  const invoice = Invoice.count({ where: { sid: data } });
  const assets = Asset.count({ where: { sid: data } });

  const [customerCount, invoiceCount, assetsCount] = await Promise.all([
    customers,
    invoice,
    assets,
  ]);

  return {
    customerCount,
    invoiceCount,
    assetsCount,
  };
}
