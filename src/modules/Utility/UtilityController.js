import { validateLabel, validateUnit } from './validations';
import UtilityService from './UtilityService';

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
        Object.assign(req.body, { sid: req.user.sub })
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
      const label = await UtilityService.deleteLabelService(req.body);

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
        Object.assign(req.body, { sid: req.user.sub })
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
      const unit = await UtilityService.deleteUnitService(req.body);

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
}
export default UtilityController;
