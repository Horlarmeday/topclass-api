import {
  createLabel,
  createUnit,
  getLabels,
  searchLabels,
  searchUnits,
  getUnits,
  deleteLabel,
  deleteUnit,
  createItem,
  deleteItem,
  getItems,
  filterItems,
  searchItems,
  getItemById,
  createSetting,
  updateSetting, getSettings,
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

  /**
   * create default item
   *
   * @static
   * @returns {json} json object with item data
   * @param body
   * @memberOf UtilityService
   */
  static async createDefaultItemService(body) {
    const item = await getItemById(body.item_id);
    if (item) throw new Error('Item already exists');
    return createItem(body);
  }

  /**
   * delete item
   *
   * @static
   * @returns {json} json object with item data
   * @param body
   * @memberOf UtilityService
   */
  static async deleteDefaultItemService(body) {
    return deleteItem(body.did);
  }

  /**
   * get default items
   *
   * @static
   * @returns {json} json object with items data
   * @param body
   * @memberOf UtilityService
   */
  static async getDefaultItemService(body) {
    const { currentPage, pageLimit, search, filter } = body;
    if (search) {
      return searchItems(Number(currentPage), Number(pageLimit), search);
    }

    if (filter) {
      return filterItems(Number(currentPage), Number(pageLimit), filter);
    }

    if (Object.values(body).length) {
      return getItems(Number(currentPage), Number(pageLimit));
    }

    return getItems();
  }

  /**
   * create setting
   *
   * @static
   * @returns {json} json object with setting data
   * @param body
   * @memberOf UtilityService
   */
  static async createSettingService(body) {
    return createSetting(body);
  }

  /**
   * update setting
   *
   * @static
   * @returns {json} json object with setting data
   * @param body
   * @memberOf UtilityService
   */
  static async updateSettingService(body) {
    return updateSetting(body);
  }

  /**
   * get settings
   *
   * @static
   * @returns {json} json object with settings data
   * @param body
   * @memberOf UtilityService
   */
  static async getSettingsService(body) {
    const { currentPage, pageLimit } = body;

    if (Object.values(body).length) {
      return getSettings(Number(currentPage), Number(pageLimit));
    }

    return getSettings();
  }
}
export default UtilityService;
