import {
  createLabel,
  createUnit,
  getLabels,
  searchLabels,
  searchUnits,
  getUnits,
  deleteLabel,
  deleteUnit,
} from './utilityRepository';

class UtilityService {
  /**
   * create a label
   *
   * @static
   * @returns {json} json object with label data
   * @param body
   * @memberOf UtilityService
   */
  static async createLabelService(body) {
    return createLabel(body);
  }

  /**
   * delete label
   *
   * @static
   * @returns {json} json object with label data
   * @param body
   * @memberOf UtilityService
   */
  static async deleteLabelService(body) {
    return deleteLabel(body.lid);
  }

  /**
   * get labels
   *
   * @static
   * @returns {json} json object with labels data
   * @param body
   * @memberOf UtilityService
   */
  static async getLabelsService(body) {
    const { currentPage, pageLimit, search } = body;
    if (search) {
      return searchLabels(Number(currentPage), Number(pageLimit), search);
    }

    if (Object.values(body).length) {
      return getLabels(Number(currentPage), Number(pageLimit));
    }

    return getLabels();
  }

  /**
   * create a unit
   *
   * @static
   * @returns {json} json object with unit data
   * @param body
   * @memberOf UtilityService
   */
  static async createUnitService(body) {
    return createUnit(body);
  }

  /**
   * delete unit
   *
   * @static
   * @returns {json} json object with unit data
   * @param body
   * @memberOf UtilityService
   */
  static async deleteUnitService(body) {
    return deleteUnit(body.uid);
  }

  /**
   * get labels
   *
   * @static
   * @returns {json} json object with labels data
   * @param body
   * @memberOf UtilityService
   */
  static async getUnitsService(body) {
    const { currentPage, pageLimit, search } = body;
    if (search) {
      return searchUnits(Number(currentPage), Number(pageLimit), search);
    }

    if (Object.values(body).length) {
      return getUnits(Number(currentPage), Number(pageLimit));
    }

    return getUnits();
  }
}
export default UtilityService;
