/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import fs from 'fs'

const { Asset, Staff, Expense } = require('../../database/models');

const { Op } = Sequelize;

/**
 * create asset in the DB
 *
 * @function
 * @returns {json} json object with asset data
 * @param data
 */
export async function createAsset(data) {
  const { name, date_purchased, location, cost, duration, depreciation, quantity, sid } = data;
  return Asset.create({
    name,
    date_purchased,
    location,
    cost,
    duration,
    depreciation,
    quantity,
    sid,
  });
}

/**
 * query asset account in the DB by asset id
 *
 * @function
 * @returns {json} json object with asset data
 * @param data
 */
export async function getAssetById(data) {
  return Asset.findByPk(data);
}

/**
 * delete asset
 *
 * @function
 * @returns {json} json object with asset data
 * @param data
 */
export async function deleteAsset(data) {
  const asset = await getAssetById(data);
  return asset.destroy({ force: true });
}

/**
 * get assets
 *
 * @function
 * @returns {json} json object with assets data
 * @param currentPage
 * @param pageLimit
 */
export async function getAssets(currentPage = 1, pageLimit = 10) {
  return Asset.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Staff }],
  });
}

/**
 * search assets
 *
 * @function
 * @returns {json} json object with assets data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchAssets(currentPage = 1, pageLimit = 10, search) {
  return Asset.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Staff }],
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          location: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });
}

/**
 * create expense in the DB
 *
 * @function
 * @returns {json} json object with expense data
 * @param data
 */
export async function createExpense(data) {
  const { name, unit, description, cost, sid } = data;
  return Expense.create({
    name,
    description,
    unit,
    cost,
    sid,
  });
}

/**
 * query expense account in the DB by expense id
 *
 * @function
 * @returns {json} json object with expense data
 * @param data
 */
export async function getExpenseById(data) {
  return Expense.findByPk(data);
}

/**
 * delete expense
 *
 * @function
 * @returns {json} json object with expense data
 * @param data
 */
export async function deleteExpense(data) {
  const expense = await getExpenseById(data);
  return expense.destroy({ force: true });
}

/**
 * get expenses
 *
 * @function
 * @returns {json} json object with expenses data
 * @param currentPage
 * @param pageLimit
 */
export async function getExpenses(currentPage = 1, pageLimit = 10) {
  return Expense.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Staff }],
  });
}

/**
 * search expenses
 *
 * @function
 * @returns {json} json object with expenses data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchExpenses(currentPage = 1, pageLimit = 10, search) {
  return Expense.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Staff }],
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
    },
  });
}

/**
 * export expenses
 *
 * @function
 * @returns {json} json object with expenses data
 * @param search
 */
export async function exportExpenses(search) {
  return Expense.findAll({
    order: [['createdAt', 'DESC']],
    include: [{ model: Staff }],
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
    },
  });
}
