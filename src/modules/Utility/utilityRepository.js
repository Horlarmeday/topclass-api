/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

const { Label, Unit } = require('../../database/models');

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
