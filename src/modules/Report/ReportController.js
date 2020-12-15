import ReportService from './ReportService';

class ReportController {
  /**
   * get revenue reports
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with revenue data
   */
  static async getRevenueReport(req, res, next) {
    try {
      const revenue = await ReportService.getRevenueService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: revenue,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get expenses reports
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with expenses data
   */
  static async getExpensesReport(req, res, next) {
    try {
      const expense = await ReportService.getExpenseService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: expense,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get inventory reports
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with inventory data
   */
  static async getInventoryReport(req, res, next) {
    try {
      const inventory = await ReportService.getInventoryService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: inventory,
      });
    } catch (e) {
      return next(e);
    }
  }
}

export default ReportController;
