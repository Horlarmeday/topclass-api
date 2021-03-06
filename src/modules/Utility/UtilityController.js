/* eslint-disable camelcase */
import { validateBank, validateDefaultItem, validateLabel, validateSetting, validateUnit } from './validations';
import UtilityService from './UtilityService';
import ProductService from '../Product/ProductService';

/**
 *
 *
 * @class UtilityController
 */
class UtilityController {
  /**
   * create a label
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, label data
   */
  static async createLabel(req, res, next) {
    const { error } = validateLabel(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const label = await UtilityService.createLabelService(
        Object.assign(req.body, { sid: req.user.sub, fullname: req.user.fullname })
      );

      return res.status(201).json({
        message: 'Successful, label created!',
        data: label,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * delete label
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with label data
   */
  static async deleteLabel(req, res, next) {
    const { lid } = req.body;
    if (!lid) return res.status(400).json('Label id required');

    try {
      const label = await UtilityService.deleteLabelService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Label deleted successfully',
        data: label,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all labels
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with labels data
   */
  static async getLabels(req, res, next) {
    try {
      const labels = await UtilityService.getLabelsService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: labels,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create a label
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, label data
   */
  static async createUnit(req, res, next) {
    const { error } = validateUnit(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const unit = await UtilityService.createUnitService(
        Object.assign(req.body, { sid: req.user.sub, fullname: req.user.fullname })
      );

      return res.status(201).json({
        message: 'Successful, unit created!',
        data: unit,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * delete label
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with label data
   */
  static async deleteUnit(req, res, next) {
    const { uid } = req.body;
    if (!uid) return res.status(400).json('Unit id required');

    try {
      const unit = await UtilityService.deleteUnitService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Unit deleted successfully',
        data: unit,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all units
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with units data
   */
  static async getUnits(req, res, next) {
    try {
      const units = await UtilityService.getUnitsService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: units,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create default item
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, item data
   */
  static async createDefaultItem(req, res, next) {
    const { error } = validateDefaultItem(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const item = await UtilityService.createDefaultItemService(
        Object.assign(req.body, { sid: req.user.sub, fullname: req.user.fullname })
      );

      return res.status(201).json({
        message: 'Successful, item added!',
        data: item,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get default items
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with items data
   */
  static async getDefaultItems(req, res, next) {
    try {
      const items = await UtilityService.getDefaultItemService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: items,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * delete default item
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with label data
   */
  static async deleteDefaultItem(req, res, next) {
    const { did } = req.body;
    if (!did) return res.status(400).json('item id required');

    try {
      const item = await UtilityService.deleteDefaultItemService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Item deleted successfully',
        data: item,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create setting
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, setting data
   */
  static async createSetting(req, res, next) {
    const { error } = validateSetting(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const setting = await UtilityService.createSettingService(
        Object.assign(req.body, { sid: req.user.sub, fullname: req.user.fullname })
      );

      return res.status(201).json({
        message: 'Successful, setting updated!',
        data: setting,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get settings
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with settings data
   */
  static async getSettings(req, res, next) {
    try {
      const settings = await UtilityService.getSettingsService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: settings,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update setting
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with setting data
   */
  static async updateSetting(req, res, next) {
    const { stid } = req.body;
    if (!stid) return res.status(400).json('setting id required');

    try {
      const setting = await UtilityService.updateSettingService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Changes saved!',
        data: setting,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create bank
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, bank data
   */
  static async createBank(req, res, next) {
    const { error } = validateBank(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const bank = await UtilityService.createBankService(
        Object.assign(req.body, { sid: req.user.sub, fullname: req.user.fullname })
      );

      return res.status(201).json({
        message: 'Successful, data created!',
        data: bank,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update bank
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with bank data
   */
  static async updateBank(req, res, next) {
    const { bank_id } = req.body;
    if (!bank_id) return res.status(400).json('Bank id required');

    try {
      const bank = await UtilityService.updateBankService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Data updated successfully',
        data: bank,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get banks
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with banks data
   */
  static async getBanks(req, res, next) {
    try {
      const banks = await UtilityService.getBankService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: banks,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default UtilityController;
