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
  updateSetting,
  getSettings,
  createBank,
  getBanks, updateBank,
} from './utilityRepository';
import { auditLog } from '../../command/schedule';
import { updateProduct } from '../Product/productRepository';

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
    const label = await createLabel(body);
    // Audit Log
    const content = `${body.fullname} created a new label (${label.name})`;
    await auditLog(content, body.sid);

    return label;
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
    const label = await deleteLabel(body.lid);
    // Audit Log
    const content = `${body.staff.fullname} deleted ${label.name} label`;
    await auditLog(content, body.staff.sub);

    return label;
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
    const unit = await createUnit(body);
    // Audit Log
    const content = `${body.fullname} created a new unit (${unit.name})`;
    await auditLog(content, body.sid);

    return unit;
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
    const unit = await deleteUnit(body.uid);
    // Audit Log
    const content = `${body.staff.fullname} deleted (${unit.name}) unit`;
    await auditLog(content, body.staff.sub);

    return unit;
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
    const newItem = await createItem(body);
    // Audit Log
    const content = `${body.fullname} added ${newItem.item} to ${newItem.type} default items`;
    await auditLog(content, body.sid);

    return newItem;
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
    const item = await deleteItem(body.did);
    // Audit Log
    const content = `${body.staff.fullname} removed ${item.item} from ${item.type} default items`;
    await auditLog(content, body.staff.sub);

    return item;
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
    const setting = await createSetting(body);
    // Audit Log
    const content = `${body.fullname} created a new setting (${setting.name})`;
    await auditLog(content, body.sid);

    return setting;
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
    const setting = await updateSetting(body);
    // Audit Log
    const content = `${body.staff.fullname} updated setting (${setting.name})`;
    await auditLog(content, body.staff.sub);

    return setting;
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

  /**
   * create a bank
   *
   * @static
   * @returns {json} json object with bank data
   * @param body
   * @memberOf UtilityService
   */
  static async createBankService(body) {
    const bank = await createBank(body);
    // Audit Log
    const content = `${body.fullname} created a new bank (${bank.bank_name})`;
    await auditLog(content, body.sid);

    return bank;
  }

  /**
   * update bank
   *
   * @static
   * @returns {json} json object with bank data
   * @param body
   * @memberOf ProductService
   */
  static async updateBankService(body) {
    const bank = await updateBank(body);
    // Audit Log
    const content = `${body.staff.fullname} updated ${bank.bank_name}`;
    await auditLog(content, body.staff.sub);

    return bank;
  }

  /**
   * get bank
   *
   * @static
   * @returns {json} json object with bank data
   * @param body
   * @memberOf UtilityService
   */
  static async getBankService(body) {
    const { currentPage, pageLimit } = body;

    if (Object.values(body).length) {
      return getBanks(+currentPage, +pageLimit);
    }

    return getBanks();
  }
}
export default UtilityService;
