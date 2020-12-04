/* eslint-disable camelcase */
import { validateAsset, validateExpense } from './validations';
import ExpenditureService from './ExpenditureService';
/**
 *
 *
 * @class ExpenditureController
 */
class ExpenditureController {
  /**
   * create an asset
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, asset data
   */
  static async createAsset(req, res, next) {
    const { error } = validateAsset(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const asset = await ExpenditureService.createAssetService(
        Object.assign(req.body, { sid: req.user.sub })
      );

      return res.status(201).json({
        message: 'Successful, asset created!',
        data: asset,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * delete asset data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with asset data
   */
  static async deleteAsset(req, res, next) {
    const { asid } = req.body;
    if (!asid) return res.status(400).json('Asset id required!');

    try {
      const asset = await ExpenditureService.deleteAssetService(req.body);

      return res.status(200).json({
        message: 'Asset deleted successfully',
        data: asset,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all assets
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with assets data
   */
  static async getAssets(req, res, next) {
    try {
      const assets = await ExpenditureService.getAssets(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: assets,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create an expense
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, expense data
   */
  static async createExpense(req, res, next) {
    const { error } = validateExpense(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const expense = await ExpenditureService.createExpenseService(
        Object.assign(req.body, { sid: req.user.sub })
      );

      return res.status(201).json({
        message: 'Successful, expenditure created!',
        data: expense,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * delete expense data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with expense data
   */
  static async deleteExpense(req, res, next) {
    const { exid } = req.body;
    if (!exid) return res.status(400).json('Asset id required!');

    try {
      const expense = await ExpenditureService.deleteExpenseService(req.body);

      return res.status(200).json({
        message: 'Expenditure deleted successfully',
        data: expense,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all expenses
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with expenses data
   */
  static async getExpenses(req, res, next) {
    try {
      const expenses = await ExpenditureService.getExpenses(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: expenses,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default ExpenditureController;
