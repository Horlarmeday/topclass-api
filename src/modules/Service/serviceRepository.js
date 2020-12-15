/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

const { Service } = require('../../database/models');

const { Op } = Sequelize;

/**
 * create a service
 *
 * @function
 * @returns {json} json object with service data
 * @param data
 */
export async function createService(data) {
  const { name, desc, quantity, selling_price, comment, sid, unit, label } = data;
  return Service.create({
    name,
    desc,
    quantity,
    selling_price,
    comment,
    sid,
    unit,
    label,
  });
}

/**
 * query service by service id
 *
 * @function
 * @returns {json} json object with service data
 * @param data
 */
export async function getServiceById(data) {
  return Service.findByPk(data);
}

/**
 * update service
 *
 * @function
 * @returns {json} json object with service data
 * @param data
 */
export async function updateService(data) {
  const service = await getServiceById(data.svid);
  return service.update(data);
}

/**
 * get services
 *
 * @function
 * @returns {json} json object with services data
 * @param currentPage
 * @param pageLimit
 */
export async function getServices(currentPage = 1, pageLimit = 10) {
  return Service.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
  });
}

/**
 * search services
 *
 * @function
 * @returns {json} json object with services data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchServices(currentPage = 1, pageLimit = 10, search) {
  return Service.paginate({
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
