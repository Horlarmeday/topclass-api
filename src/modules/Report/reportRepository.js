/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import { reduceArray, removeNullInvoice } from '../../helpers/helper';

const {
  Invoice,
  Customer,
  InvoiceItem,
  Payment,
  Expense,
  DispenseHistory,
  Staff,
  Product,
} = require('../../database/models');

const { Op } = Sequelize;

/**
 * get revenue by payment method
 *
 * @function
 * @returns {json} json object with revenue data
 * @param currentPage
 * @param pageLimit
 * @param paymentMethod
 * @param start
 * @param end
 * @param should_export
 */
export async function getRevenueByPaymentMethod(
  currentPage = 1,
  pageLimit = 10,
  paymentMethod,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    return Payment.findAll({
      include: [
        {
          model: Invoice,
          attributes: ['ivid', 'name', 'invoice_numb', 'invoice_type'],
          include: [
            { model: InvoiceItem },
            { model: Customer, attributes: ['cid', 'name', 'email', 'phone'] },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      where: {
        payment_method: paymentMethod,
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
    });
  }

  const revenue = await Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Invoice, include: [{ model: Customer }] }],
    where: {
      payment_method: paymentMethod,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
  });

  const total = await Payment.findAll({
    where: {
      payment_method: paymentMethod,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    attributes: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'total']],
    raw: true,
  });

  return {
    revenue,
    totalAmount: total[0].total,
  };
}

/**
 * get revenue by bank
 *
 * @function
 * @returns {json} json object with revenue data
 * @param currentPage
 * @param pageLimit
 * @param bank
 * @param start
 * @param end
 * @param should_export
 */
export async function getRevenueByBank(
  currentPage = 1,
  pageLimit = 10,
  bank,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    return Payment.findAll({
      include: [
        {
          model: Invoice,
          attributes: ['ivid', 'name', 'invoice_numb', 'invoice_type'],
          include: [
            { model: InvoiceItem },
            { model: Customer, attributes: ['cid', 'name', 'email', 'phone'] },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      where: {
        bank,
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
    });
  }

  const revenue = await Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Invoice, include: [{ model: Customer }] }],
    where: {
      bank,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
  });

  const total = await Payment.findAll({
    where: {
      bank,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    attributes: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'total']],
    raw: true,
  });

  return {
    revenue,
    totalAmount: total[0].total,
  };
}

/**
 * get revenue by product type
 *
 * @function
 * @returns {json} json object with revenue data
 * @param currentPage
 * @param pageLimit
 * @param typeOfProduct
 * @param start
 * @param end
 * @param should_export
 */
export async function getRevenueByProduct(
  currentPage = 1,
  pageLimit = 10,
  typeOfProduct,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    const exportedRevenue = await Payment.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Invoice,
          attributes: ['ivid', 'name', 'invoice_numb', 'invoice_type'],
          include: [
            { model: InvoiceItem, where: { label: typeOfProduct } },
            { model: Customer, attributes: ['cid', 'name', 'email', 'phone'] },
          ],
        },
      ],
    });

    return removeNullInvoice(exportedRevenue);
  }

  const revenue = await Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [
      {
        model: Invoice,
        include: [{ model: InvoiceItem, where: { label: typeOfProduct } }, { model: Customer }],
      },
    ],
  });

  const payments = await Payment.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Invoice,
        include: [{ model: InvoiceItem, where: { label: typeOfProduct } }],
      },
    ],
    required: true,
  });

  return {
    revenue,
    totalAmount: reduceArray(payments),
  };
}

/**
 * get revenue by product type and payment method
 *
 * @function
 * @returns {json} json object with revenue data
 * @param currentPage
 * @param pageLimit
 * @param typeOfProduct
 * @param paymentMethod
 * @param start
 * @param end
 * @param should_export
 */
export async function getRevenueByProductAndMethod(
  currentPage = 1,
  pageLimit = 10,
  typeOfProduct,
  paymentMethod,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    const exportedRevenue = await Payment.findAll({
      where: {
        payment_method: paymentMethod,
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Invoice,
          attributes: ['ivid', 'name', 'invoice_numb', 'invoice_type'],
          include: [
            { model: Customer, attributes: ['cid', 'name', 'email', 'phone'] },
            { model: InvoiceItem, where: { label: typeOfProduct } },
          ],
        },
      ],
    });

    return removeNullInvoice(exportedRevenue);
  }

  const revenue = await Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      payment_method: paymentMethod,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [
      {
        model: Invoice,
        include: [{ model: Customer }, { model: InvoiceItem, where: { label: typeOfProduct } }],
      },
    ],
  });

  const payments = await Payment.findAll({
    where: {
      payment_method: paymentMethod,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [
      {
        model: Invoice,
        include: [{ model: InvoiceItem, where: { label: typeOfProduct } }],
      },
    ],
  });

  return {
    revenue,
    totalAmount: reduceArray(payments),
  };
}

/**
 * get revenue by product type and bank
 *
 * @function
 * @returns {json} json object with revenue data
 * @param currentPage
 * @param pageLimit
 * @param typeOfProduct
 * @param bank
 * @param start
 * @param end
 * @param should_export
 */
export async function getRevenueByProductAndBank(
  currentPage = 1,
  pageLimit = 10,
  typeOfProduct,
  bank,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    const exportedRevenue = await Payment.findAll({
      where: {
        bank,
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Invoice,
          attributes: ['ivid', 'name', 'invoice_numb', 'invoice_type'],
          include: [
            { model: Customer, attributes: ['cid', 'name', 'email', 'phone'] },
            { model: InvoiceItem, where: { label: typeOfProduct } },
          ],
        },
      ],
    });
    return removeNullInvoice(exportedRevenue);
  }
  const revenue = await Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      bank,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [
      {
        model: Invoice,
        include: [{ model: Customer }, { model: InvoiceItem, where: { label: typeOfProduct } }],
      },
    ],
  });

  const payments = await Payment.findAll({
    where: {
      bank,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [
      {
        model: Invoice,
        include: [{ model: InvoiceItem, where: { label: typeOfProduct } }],
      },
    ],
  });

  return {
    revenue,
    totalAmount: reduceArray(payments),
  };
}

/**
 * get revenue by payment method and bank
 *
 * @function
 * @returns {json} json object with revenue data
 * @param currentPage
 * @param pageLimit
 * @param paymentMethod
 * @param bank
 * @param start
 * @param end
 * @param should_export
 */
export async function getRevenueByMethodAndBank(
  currentPage = 1,
  pageLimit = 10,
  paymentMethod,
  bank,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    return Payment.findAll({
      where: {
        payment_method: paymentMethod,
        bank,
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Invoice,
          attributes: ['ivid', 'name', 'invoice_numb', 'invoice_type'],
          include: [
            { model: Customer, attributes: ['cid', 'name', 'email', 'phone'] },
            { model: InvoiceItem },
          ],
        },
      ],
    });
  }

  const revenue = await Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      payment_method: paymentMethod,
      bank,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [{ model: Invoice, include: [{ model: Customer }] }],
  });

  const payments = await Payment.findAll({
    where: {
      payment_method: paymentMethod,
      bank,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    attributes: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'total']],
    raw: true,
  });

  return {
    revenue,
    totalAmount: payments[0].total,
  };
}

/**
 * get revenue by product type, bank and payment method
 *
 * @function
 * @returns {json} json object with revenue data
 * @param currentPage
 * @param pageLimit
 * @param typeOfProduct
 * @param paymentMethod
 * @param bank
 * @param start
 * @param end
 * @param should_export
 */
export async function getRevenueByProductMethodAndBank(
  currentPage = 1,
  pageLimit = 10,
  typeOfProduct,
  paymentMethod,
  bank,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    const exportedRevenue = await Payment.findAll({
      where: {
        payment_method: paymentMethod,
        bank,
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Invoice,
          attributes: ['ivid', 'name', 'invoice_numb', 'invoice_type'],
          include: [
            { model: Customer, attributes: ['cid', 'name', 'email', 'phone'] },
            { model: InvoiceItem, where: { label: typeOfProduct } },
          ],
        },
      ],
    });
    return removeNullInvoice(exportedRevenue);
  }

  const revenue = await Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      payment_method: paymentMethod,
      bank,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [
      {
        model: Invoice,
        include: [{ model: Customer }, { model: InvoiceItem, where: { label: typeOfProduct } }],
      },
    ],
  });

  const payments = await Payment.findAll({
    where: {
      payment_method: paymentMethod,
      bank,
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [
      {
        model: Invoice,
        include: [{ model: InvoiceItem, where: { label: typeOfProduct } }],
      },
    ],
  });

  return {
    revenue,
    totalAmount: reduceArray(payments),
  };
}

/**
 * get all revenue
 *
 * @function
 * @returns {json} json object with revenue data
 * @param currentPage
 * @param pageLimit
 * @param start
 * @param end
 * @param should_export
 */
export async function getRevenue(
  currentPage = 1,
  pageLimit = 10,
  start,
  end,
  should_export = false
) {
  if (should_export) {
    return Payment.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Invoice,
          attributes: ['ivid', 'name', 'invoice_numb', 'invoice_type'],
          include: [
            { model: Customer, attributes: ['cid', 'name', 'email', 'phone'] },
            { model: InvoiceItem },
          ],
        },
      ],
    });
  }
  const revenue = await Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: Invoice, include: [{ model: Customer }] }],
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
  });

  const total = await Payment.findAll({
    attributes: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'total']],
    raw: true,
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
  });

  return {
    revenue,
    totalAmount: total[0].total,
  };
}

/**
 * search revenue
 *
 * @function
 * @returns {json} json object with revenue data
 * @param currentPage
 * @param pageLimit
 * @param start
 * @param end
 * @param search
 * @param should_export
 */
export async function searchRevenue(
  currentPage = 1,
  pageLimit = 10,
  start,
  end,
  search,
  should_export = false
) {
  if (should_export) {
    const exportedRevenue = await Payment.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Invoice,
          attributes: ['ivid', 'name', 'invoice_numb', 'invoice_type'],
          include: [
            { model: Customer, attributes: ['cid', 'name', 'email', 'phone'] },
            { model: InvoiceItem, where: { item: { [Op.like]: `%${search}%` } } },
          ],
        },
      ],
    });

    return removeNullInvoice(exportedRevenue);
  }

  const revenue = await Payment.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [
      {
        model: Invoice,
        include: [
          { model: InvoiceItem, where: { item: { [Op.like]: `%${search}%` } } },
          { model: Customer },
        ],
      },
    ],
  });

  const payments = await Payment.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    include: [
      {
        model: Invoice,
        include: [{ model: InvoiceItem, where: { item: { [Op.like]: `%${search}%` } } }],
      },
    ],
  });

  return {
    revenue,
    totalAmount: reduceArray(payments),
  };
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

  const expenses = await DispenseHistory.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
  });

  const total = await DispenseHistory.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
        [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
      },
    },
    group: ['name'],
    attributes: [[Sequelize.fn('COUNT', 'quantity'), 'quantityCount']],
    raw: true,
  });

  return {
    expenses,
    totalQuantity: total,
  };
}
