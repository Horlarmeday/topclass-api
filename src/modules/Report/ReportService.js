/* eslint-disable camelcase */
import {
  getExpensesReport,
  getInventoryReport,
  getInventoryReportByItem,
  getRevenue,
  searchExpenses,
  searchRevenue,
} from './reportRepository';
import { startOfTheYear } from '../../helpers/helper';

class ReportService {
  /**
   * get revenue
   *
   * @static
   * @returns {json} json object with revenue data
   * @param body
   * @memberOf ReportService
   */
  static async getRevenueService(body) {
    let { start, end } = body;
    const { search } = body;

    if (!start) {
      start = startOfTheYear();
    }

    if (!end) {
      end = new Date();
    }

    if (search) {
      return searchRevenue(start, end, search);
    }

    return getRevenue(start, end);
  }

  /**
   * get expenses
   *
   * @static
   * @returns {json} json object with expenses data
   * @param body
   * @memberOf ReportService
   */
  static async getExpenseService(body) {
    let { start, end } = body;
    const { currentPage, pageLimit, search, should_export } = body;

    if (!start) {
      start = startOfTheYear();
    }

    if (!end) {
      end = new Date();
    }

    if (search) {
      return searchExpenses(
        Number(currentPage),
        Number(pageLimit),
        start,
        end,
        search,
        should_export
      );
    }

    return getExpensesReport(Number(currentPage), Number(pageLimit), start, end, should_export);
  }

  /**
   * get expenses
   *
   * @static
   * @returns {json} json object with expenses data
   * @param body
   * @memberOf ReportService
   */
  static async getInventoryService(body) {
    let { start, end } = body;
    const { currentPage, pageLimit, should_export, search } = body;

    if (!start) {
      start = startOfTheYear();
    }

    if (!end) {
      end = new Date();
    }

    if (search) {
      return getInventoryReportByItem(start, end, search);
    }

    return getInventoryReport(Number(currentPage), Number(pageLimit), start, end, should_export);
  }
}

export default ReportService;
