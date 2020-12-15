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
import { auditLog } from '../../command/schedule';

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
    const createdAsset = await createAsset(body);
    // Audit Log
    const content = `${body.fullname} created a (${createdAsset.name}) asset`;
    await auditLog(content, body.sid);

    return createdAsset;
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
    const deletedAsset = await deleteAsset(body.asid);
    // Audit Log
    const content = `${body.staff.fullname} deleted ${deletedAsset.name} from assets`;
    await auditLog(content, body.staff.sub);

    return deletedAsset;
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
    const createdExpense = await createExpense(body);
    // Audit Log
    const content = `${body.fullname} created a ${createdExpense.name} expense`;
    await auditLog(content, body.sid);

    return createdExpense;
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
    const deletedExpense = await deleteExpense(body.exid);
    // Audit Log
    const content = `${body.staff.fullname} deleted (${deletedExpense.name}) from expenses`;
    await auditLog(content, body.staff.sub);

    return deletedExpense;
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
