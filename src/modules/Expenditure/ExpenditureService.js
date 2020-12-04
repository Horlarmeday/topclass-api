import {
  createAsset,
  getAssets,
  searchAssets,
  deleteAsset,
  createExpense,
  getExpenses,
  searchExpenses,
  deleteExpense,
} from './expenditureRepository';

class ExpenditureService {
  /**
   * create asset
   *
   * @static
   * @returns {json} json object with asset data
   * @param body
   * @memberOf ExpenditureService
   */
  static async createAssetService(body) {
    return createAsset(body);
  }

  /**
   * delete asset
   *
   * @static
   * @returns {json} json object with asset data
   * @param body
   * @memberOf ExpenditureService
   */
  static async deleteAssetService(body) {
    return deleteAsset(body.asid);
  }

  /**
   * get assets
   *
   * @static
   * @returns {json} json object with assets data
   * @param body
   * @memberOf ExpenditureService
   */
  static async getAssets(body) {
    const { currentPage, pageLimit, search } = body;
    if (search) {
      return searchAssets(Number(currentPage), Number(pageLimit), search);
    }

    if (Object.values(body).length) {
      return getAssets(Number(currentPage), Number(pageLimit));
    }

    return getAssets();
  }

  /**
   * create expense
   *
   * @static
   * @returns {json} json object with expense data
   * @param body
   * @memberOf ExpenditureService
   */
  static async createExpenseService(body) {
    return createExpense(body);
  }

  /**
   * delete expense
   *
   * @static
   * @returns {json} json object with expense data
   * @param body
   * @memberOf ExpenditureService
   */
  static async deleteExpenseService(body) {
    return deleteExpense(body.exid);
  }

  /**
   * get expenses
   *
   * @static
   * @returns {json} json object with expenses data
   * @param body
   * @memberOf ExpenditureService
   */
  static async getExpenses(body) {
    const { currentPage, pageLimit, search } = body;
    if (search) {
      return searchExpenses(Number(currentPage), Number(pageLimit), search);
    }

    if (Object.values(body).length) {
      return getExpenses(Number(currentPage), Number(pageLimit));
    }

    return getExpenses();
  }
}
export default ExpenditureService;
