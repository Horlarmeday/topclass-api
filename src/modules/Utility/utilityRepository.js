/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

const { Label, Unit, Item, Setting, Bank } = require('../../database/models');

const { Op } = Sequelize;

/**
 * create a label
 *
 * @function
 * @returns {json} json object with label data
 * @param data
 */
export async function createLabel(data) {
  return Label.create(data);
}


export async function getBankById(data) {
  return Bank.findByPk(data);
}

/**
 * query label by label id
 *
 * @function
 * @returns {json} json object with label data
 * @param data
 */
export async function getLabelById(data) {
  return Label.findByPk(data);
}

/**
 * delete label
 *
 * @function
 * @returns {json} json object with delete data
 * @param data
 */
export async function deleteLabel(data) {
  const label = await getLabelById(data);
  return label.destroy({ force: true });
}

/**
 * get labels
 *
 * @function
 * @returns {json} json object with labels data
 * @param currentPage
 * @param pageLimit
 */
export async function getLabels(currentPage = 1, pageLimit = 10) {
  return Label.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
  });
}

/**
 * search labels
 *
 * @function
 * @returns {json} json object with labels data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchLabels(currentPage = 1, pageLimit = 10, search) {
  return Label.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
    },
  });
}

/**
 * create a unit
 *
 * @function
 * @returns {json} json object with unit data
 * @param data
 */
export async function createUnit(data) {
  return Unit.create(data);
}

/**
 * query unit by unit id
 *
 * @function
 * @returns {json} json object with unit data
 * @param data
 */
export async function getUnitById(data) {
  return Unit.findByPk(data);
}

/**
 * delete unit
 *
 * @function
 * @returns {json} json object with unit data
 * @param data
 */
export async function deleteUnit(data) {
  const unit = await getUnitById(data);
  return unit.destroy({ force: true });
}

/**
 * get units
 *
 * @function
 * @returns {json} json object with units data
 * @param currentPage
 * @param pageLimit
 */
export async function getUnits(currentPage = 1, pageLimit = 10) {
  return Unit.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
  });
}

/**
 * search units
 *
 * @function
 * @returns {json} json object with units data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchUnits(currentPage = 1, pageLimit = 10, search) {
  return Unit.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
    },
  });
}

/**
 * create default item
 *
 * @function
 * @returns {json} json object with item data
 * @param data
 */
export async function createItem(data) {
  const { item, item_id, quantity, type, price, sid, label } = data;
  return Item.create({
    item,
    item_id,
    quantity,
    type,
    price,
    sid,
    label,
  });
}

/**
 * query item by id
 *
 * @function
 * @returns {json} json object with item data
 * @param data
 */
export async function getItemById(data) {
  return Item.findByPk(data);
}

/**
 * delete item
 *
 * @function
 * @returns {json} json object with item data
 * @param data
 */
export async function deleteItem(data) {
  const item = await getItemById(data);
  return item.destroy({ force: true });
}

/**
 * get items
 *
 * @function
 * @returns {json} json object with items data
 * @param currentPage
 * @param pageLimit
 */
export async function getItems(currentPage = 1, pageLimit = 10) {
  return Item.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
  });
}

/**
 * filter items
 *
 * @function
 * @returns {json} json object with items data
 * @param currentPage
 * @param pageLimit
 * @param filter
 */
export async function filterItems(currentPage = 1, pageLimit = 10, filter) {
  return Item.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      type: filter,
    },
  });
}

/**
 * search items
 *
 * @function
 * @returns {json} json object with items data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchItems(currentPage = 1, pageLimit = 10, search) {
  return Item.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      item: {
        [Op.like]: `%${search}%`,
      },
    },
  });
}

/**
 * query setting by id
 *
 * @function
 * @returns {json} json object with setting data
 * @param data
 */
export async function getSettingById(data) {
  return Setting.findByPk(data);
}

/**
 * query setting by name
 *
 * @function
 * @returns {json} json object with setting data
 * @param data
 */
export async function getSettingByName(data) {
  return Setting.findOne({ where: { name: data }, order: [['createdAt', 'DESC']] });
}

/**
 * update a setting
 *
 * @function
 * @returns {json} json object with setting data
 * @param data
 */
export async function updateSetting(data) {
  const setting = await getSettingById(data.stid);
  return setting.update({ data });
}

/**
 * create a setting
 *
 * @function
 * @returns {json} json object with setting data
 * @param data
 */
export async function createSetting(data) {
  return Setting.create(data);
}

/**
 * get settings
 *
 * @function
 * @returns {json} json object with settings data
 * @param currentPage
 * @param pageLimit
 */
export async function getSettings(currentPage = 1, pageLimit = 10) {
  return Setting.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
  });
}

/**
 * create a bank
 *
 * @function
 * @returns {json} json object with bank data
 * @param data
 */
export async function createBank(data) {
  const { account_name, bank_name, account_number, sort_code, tin_number } = data;
  return Bank.create({
    account_name,
    bank_name,
    account_number,
    sort_code,
    tin_number,
  });
}


/**
 * update bank
 *
 * @function
 * @returns {json} json object with bank data
 * @param data
 */
export async function updateBank(data) {
  const bank = await getBankById(data.bank_id);
  return bank.update(data);
}

/**
 * get banks
 *
 * @function
 * @returns {json} json object with banks data
 * @param currentPage
 * @param pageLimit
 */
export async function getBanks(currentPage = 1, pageLimit = 10) {
  return Bank.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
  });
}
