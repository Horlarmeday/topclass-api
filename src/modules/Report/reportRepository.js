/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';

const {
  Invoice,
  InvoiceItem,
  Payment,
  Expense,
  DispenseHistory,
  Staff,
  Product,
} = require('../../database/models');

const { Op } = Sequelize;

/**
 * get all revenue
 *
 * @function
 * @returns {json} json object with revenue data
 * @param start
 * @param end
 */
export async function getRevenue(start, end) {
  return Invoice.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Payment,
        attributes: [],
      },
      { model: InvoiceItem, attributes: [] },
    ],
    where: {
      has_step_down: 1,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    group: ['InvoiceItems.item_id'],
    attributes: [
      'InvoiceItems.item',
      'InvoiceItems.item_id',
      'InvoiceItems.label',
      'Payments.createdAt',
      'vat',
      [Sequelize.fn('SUM', Sequelize.col('Payments.amount')), 'totalAmount'],
    ],
    raw: true,
  });

  return {
    revenue,
  };
}

/**
 * search revenue
 *
 * @function
 * @returns {json} json object with revenue data
 * @param start
 * @param end
 * @param search
 */
export async function searchRevenue(start, end, search) {
  return Invoice.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Payment,
        attributes: [],
      },
      { model: InvoiceItem, attributes: [], where: { item: { [Op.like]: `%${search}%` } } },
    ],
    where: {
      has_step_down: 1,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    group: ['InvoiceItems.item_id'],
    attributes: [
      'InvoiceItems.item',
      'InvoiceItems.item_id',
      'InvoiceItems.label',
      'Payments.createdAt',
      'vat',
      [Sequelize.fn('SUM', Sequelize.col('Payments.amount')), 'totalAmount'],
    ],
    raw: true,
  });
}

/**
 * search expenses
 *
 * @function
 * @returns {json} json object with expenses data
 * @param currentPage
 * @param pageLimit
 * @param start
 * @param end
 * @param search
 * @param should_export
 */
export async function searchExpenses(
  currentPage = 1,
  pageLimit = 10,
  start,
  end,
  search,
  should_export = false
) {
  if (should_export) {
    return Expense.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
    });
  }

  const expenses = await Expense.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Staff }],
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
  });

  const total = await Expense.findAll({
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    attributes: [[Sequelize.fn('SUM', Sequelize.col('cost')), 'total']],
    raw: true,
  });

  return {
    expenses,
    totalAmount: total[0].total,
  };
}

/**
 * get expenses report
 *
 * @function
 * @returns {json} json object with expenses data
 * @param currentPage
 * @param pageLimit
 * @param start
 * @param end
 * @param should_export
 */
export async function getExpensesReport(
  currentPage = 1,
  pageLimit = 10,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    return Expense.findAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: Staff }],
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
    });
  }

  const expenses = await Expense.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Staff }],
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
  });

  const total = await Expense.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    attributes: [[Sequelize.fn('SUM', Sequelize.col('cost')), 'total']],
    raw: true,
  });

  return {
    expenses,
    totalAmount: total[0].total,
  };
}

/**
 * get inventory report
 *
 * @function
 * @returns {json} json object with inventory data
 * @param currentPage
 * @param pageLimit
 * @param start
 * @param end
 * @param should_export
 */
export async function getInventoryReport(
  currentPage = 1,
  pageLimit = 10,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    return DispenseHistory.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
      include: [{ model: Product, as: 'products', attributes: [] }],
      group: ['item_id'],
      attributes: [
        'item_id',
        'name',
        'createdAt',
        'products.selling_price',
        [Sequelize.fn('SUM', Sequelize.col('DispenseHistory.quantity')), 'quantityCount'],
      ],
      raw: true,
    });
  }

  return DispenseHistory.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [{ model: Product, as: 'products', attributes: [] }],
    group: ['item_id'],
    attributes: [
      'item_id',
      'name',
      'createdAt',
      'products.selling_price',
      [Sequelize.fn('SUM', Sequelize.col('DispenseHistory.quantity')), 'quantityCount'],
    ],
    raw: true,
  });
}

/**
 * get inventory report by Item
 *
 * @function
 * @returns {json} json object with inventory data
 * @param start
 * @param end
 * @param search
 */
export async function getInventoryReportByItem(start, end, search) {
  return DispenseHistory.findAll({
    where: {
      item_id: search,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [{ model: Product, attributes: ['selling_price'] }],
    group: ['item_id'],
    attributes: [
      'item_id',
      'name',
      'createdAt',
      [Sequelize.fn('SUM', Sequelize.col('DispenseHistory.quantity')), 'quantityCount'],
    ],
    raw: true,
  });
}
