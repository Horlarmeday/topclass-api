import { Sequelize } from 'sequelize';

const { Customer } = require('../../database/models');

const { Op } = Sequelize;

/**
 * create customer account in the DB
 *
 * @function
 * @returns {json} json object with customer data
 * @param data
 */
export async function createCustomer(data) {
  return Customer.create(data);
}

/**
 * query customer account in the DB by customer id
 *
 * @function
 * @returns {json} json object with customer data
 * @param data
 */
export async function getCustomerById(data) {
  return Customer.findByPk(data);
}

/**
 * query customer account in the DB by customer phone
 *
 * @function
 * @returns {json} json object with customer data
 * @param data
 */
export async function findCustomerByPhone(data) {
  return Customer.findOne({ where: { phone: data } });
}

/**
 * update customer
 *
 * @function
 * @returns {json} json object with customer data
 * @param data
 */
export async function updateCustomer(data) {
  const customer = await getCustomerById(data.cid);
  return customer.update(data);
}

/**
 * get customers
 *
 * @function
 * @returns {json} json object with customers data
 * @param currentPage
 * @param pageLimit
 */
export async function getCustomers(currentPage = 1, pageLimit = 10) {
  return Customer.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
  });
}

/**
 * filter customers
 *
 * @function
 * @returns {json} json object with customers data
 * @param currentPage
 * @param pageLimit
 * @param filter
 */
export async function filterCustomers(currentPage = 1, pageLimit = 10, filter) {
  return Customer.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      customer_type: filter,
    },
  });
}

/**
 * search customers
 *
 * @function
 * @returns {json} json object with customers data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchCustomers(currentPage = 1, pageLimit = 10, search) {
  return Customer.paginate({
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
          phone: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });
}
