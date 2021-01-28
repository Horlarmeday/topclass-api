/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

const {
  Product,
  DispenseHistory,
  ReturnHistory,
  Staff,
  Customer,
} = require('../../database/models');

const { Op } = Sequelize;

/**
 * create a product
 *
 * @function
 * @returns {json} json object with product data
 * @param data
 */
export async function createProduct(data) {
  const { name, desc, quantity, comment, sid, unit, label } = data;
  return Product.create({
    name,
    desc,
    quantity,
    comment,
    sid,
    unit,
    label,
  });
}

/**
 * query product by product id
 *
 * @function
 * @returns {json} json object with product data
 * @param data
 */
export async function getProductById(data) {
  return Product.findByPk(data);
}

/**
 * update product
 *
 * @function
 * @returns {json} json object with product data
 * @param data
 */
export async function updateProduct(data) {
  const product = await getProductById(data.pid);
  return product.update(data);
}

/**
 * update product quantity
 *
 * @function
 * @returns {json} json object with product data
 * @param product
 * @param leftOver
 */
export async function updateProductQuantity(product, leftOver) {
  return product.update({ quantity: leftOver });
}

/**
 * get products
 *
 * @function
 * @returns {json} json object with products data
 * @param currentPage
 * @param pageLimit
 */
export async function getProducts(currentPage = 1, pageLimit = 10) {
  return Product.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
  });
}

/**
 * filter products
 *
 * @function
 * @returns {json} json object with products data
 * @param currentPage
 * @param pageLimit
 * @param filter
 */
export async function filterProducts(currentPage = 1, pageLimit = 10, filter) {
  return Product.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      label: filter,
    },
  });
}

/**
 * search product
 *
 * @function
 * @returns {json} json object with product data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchProducts(currentPage = 1, pageLimit = 10, search) {
  return Product.paginate({
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
          label: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });
}

/**
 * create invoice in the DB
 *
 * @function
 * @returns {json} json object with invoice data
 * @param data
 * @param quantity
 * @param staff
 * @param reason
 */
export async function returnProduct({ pid, quantity, newQuantity, staff, reason }) {
  await ReturnHistory.create({
    item_id: pid,
    staff_id: staff.sub,
    quantity,
    remain_quantity: newQuantity,
    reason,
  });
}

/**
 * query product by product id
 *
 * @function
 * @returns {json} json object with product data
 * @param data
 */
export async function getOneProduct(data) {
  return Product.findOne({
    where: { pid: data },
    include: [
      { model: Staff, attributes: ['fullname', 'sid'] },
      { model: ReturnHistory, include: [{ model: Staff, attributes: ['fullname', 'sid'] }] },
      {
        model: DispenseHistory,
        include: [
          { model: Customer, attributes: ['name', 'cid'] },
          { model: Staff, attributes: ['fullname', 'sid'] },
        ],
      },
    ],
  });
}
