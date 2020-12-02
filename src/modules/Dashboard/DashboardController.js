import { getSales, getInvoices, searchInvoices, searchSales } from './dashboardRepository';

/**
 *
 *
 * @class DashboardController
 */
class DashboardController {
  /** *********************
   /// ACCOUNTANT DASHBOARD
   /*************************

   /**
   * get all unpaid Sales
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with sales data
   */
  static async getSales(req, res, next) {
    const { currentPage, itemsPerPage, search } = req.query;
    let sales;
    try {
      if (search) {
        sales = await searchSales(Number(currentPage), Number(itemsPerPage), search);
      }

      sales = await getSales(Number(currentPage), Number(itemsPerPage));

      return res.status(200).json({
        message: 'Data retrieved',
        data: sales,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get approved invoices
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoices data
   */
  static async getInvoices(req, res, next) {
    const { currentPage, itemsPerPage, search } = req.query;
    let invoices;

    try {
      if (search) {
        invoices = await searchInvoices(Number(currentPage), Number(itemsPerPage), search);
      }

      invoices = await getInvoices(Number(currentPage), Number(itemsPerPage));

      return res.status(200).json({
        message: 'Success',
        data: invoices,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default DashboardController;
