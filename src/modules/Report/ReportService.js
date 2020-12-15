/* eslint-disable camelcase */
import {
  getExpensesReport, getInventoryReport,
  getRevenue,
  getRevenueByBank,
  getRevenueByMethodAndBank,
  getRevenueByPaymentMethod,
  getRevenueByProduct,
  getRevenueByProductAndBank,
  getRevenueByProductAndMethod,
  getRevenueByProductMethodAndBank,
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
    const {
      currentPage,
      pageLimit,
      bank,
      search,
      paymentMethod,
      typeOfProduct,
      should_export,
    } = body;

    if (!start) {
      start = startOfTheYear();
    }

    if (!end) {
      end = new Date();
    }

    if (search) {
      return searchRevenue(
        Number(currentPage),
        Number(pageLimit),
        start,
        end,
        search,
        should_export
      );
    }

    if (paymentMethod && !typeOfProduct && !bank) {
      return getRevenueByPaymentMethod(
        Number(currentPage),
        Number(pageLimit),
        paymentMethod,
        start,
        end,
        should_export
      );
    }

    if (typeOfProduct && !paymentMethod && !bank) {
      return getRevenueByProduct(
        Number(currentPage),
        Number(pageLimit),
        typeOfProduct,
        start,
        end,
        should_export
      );
    }

    if (bank && !paymentMethod && !typeOfProduct) {
      return getRevenueByBank(
        Number(currentPage),
        Number(pageLimit),
        bank,
        start,
        end,
        should_export
      );
    }

    if (paymentMethod && typeOfProduct && !bank) {
      return getRevenueByProductAndMethod(
        Number(currentPage),
        Number(pageLimit),
        typeOfProduct,
        paymentMethod,
        start,
        end,
        should_export
      );
    }

    if (paymentMethod && typeOfProduct && bank) {
      return getRevenueByProductMethodAndBank(
        Number(currentPage),
        Number(pageLimit),
        typeOfProduct,
        paymentMethod,
        bank,
        start,
        end,
        should_export
      );
    }

    if (paymentMethod && bank && !typeOfProduct) {
      return getRevenueByMethodAndBank(
        Number(currentPage),
        Number(pageLimit),
        paymentMethod,
        bank,
        start,
        end,
        should_export
      );
    }

    if (typeOfProduct && bank && !paymentMethod) {
      return getRevenueByProductAndBank(
        Number(currentPage),
        Number(pageLimit),
        typeOfProduct,
        bank,
        start,
        end,
        should_export
      );
    }

    return getRevenue(Number(currentPage), Number(pageLimit), start, end, should_export);
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
    const { currentPage, pageLimit, should_export } = body;

    if (!start) {
      start = startOfTheYear();
    }

    if (!end) {
      end = new Date();
    }

    return getInventoryReport(Number(currentPage), Number(pageLimit), start, end, should_export);
  }
}

export default ReportService;
