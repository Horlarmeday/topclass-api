import {
  createInvoice,
  filterInvoices,
  getInvoices,
  searchInvoices,
  updateInvoice,
  deleteInvoice,
  approveInvoice,
  declineInvoice,
  stepDownInvoice,
  createWaybill,
  getWaybills,
  searchWaybill,
  updateWaybill,
  steppedDownInvoices,
  dispenseItem,
  getItemById, createDispenseHistory,
} from './invoiceRepository';
import { getSettingByName } from '../Utility/utilityRepository';

import SettingInterface from '../../helpers/contants';
import { auditLog } from '../../command/schedule';
import { getProductById, updateProduct, updateProductQuantity } from '../Product/productRepository';

class InvoiceService {
  /**
   * create invoice
   *
   * @static
   * @returns {json} json object with invoice data
   * @param body
   * @memberOf InvoiceService
   */
  static async createInvoiceService(body) {
    const content = `${body.fullname} created an ${body.name} invoice`;
    if (body.should_include_vat) {
      const vat = await getSettingByName(SettingInterface.VAT);
      const total = body.product.map(cost => Number(cost.price)).reduce((a, b) => a + b, 0);
      const vatPrice = (Number(vat.value) / 100) * total;

      const createdInvoice = await createInvoice(body, vatPrice);

      await auditLog(content, body.sid);
      return createdInvoice;
    }

    await auditLog(content, body.sid);
    return createInvoice(body);
  }

  /**
   * update invoice
   *
   * @static
   * @returns {json} json object with invoice data
   * @param body
   * @memberOf InvoiceService
   */
  static async updateInvoiceService(body) {
    const updatedInvoice = await updateInvoice(body);
    // Audit Log
    const content = `${body.staff.fullname} updated ${updatedInvoice.name} invoice`;
    await auditLog(content, body.staff.sub);

    return updatedInvoice;
  }

  /**
   * dispense invoice item
   *
   * @static
   * @returns {json} json object with invoice data
   * @param body
   * @memberOf InvoiceService
   */
  static async dispenseItemService(body) {
    const item = await getItemById(body);
    const product = await getProductById(item.item_id);
    if (!product) throw new Error('Product not found in the inventory');

    if (item.quantity > product.quantity) throw new Error('Quantity in the inventory is low');
    // quantity difference
    const leftOver = product.quantity - item.quantity;
    const updatedItem = await dispenseItem(item);

    // update product quantity and dispense history
    await updateProductQuantity(product, leftOver);
    await createDispenseHistory(item, leftOver, body.staff.sub);

    // Audit Log
    const content = `${body.staff.fullname} dispensed ${updatedItem.item}`;
    await auditLog(content, body.staff.sub);

    return updatedItem;
  }

  /**
   * delete invoice
   *
   * @static
   * @returns {json} json object with invoice data
   * @param body
   * @memberOf InvoiceService
   */
  static async deleteInvoiceService(body) {
    const deletedInvoice = await deleteInvoice(body.ivid);
    // Audit Log
    const content = `${body.staff.fullname} deleted ${deletedInvoice.name} invoice`;
    await auditLog(content, body.staff.sub);

    return deletedInvoice;
  }

  /**
   * get invoices
   *
   * @static
   * @returns {json} json object with invoices data
   * @param body
   * @memberOf InvoiceService
   */
  static async getInvoices(body) {
    const { currentPage, pageLimit, search, filter, stepdown } = body;
    if (search) {
      return searchInvoices(Number(currentPage), Number(pageLimit), search);
    }

    if (filter) {
      return filterInvoices(Number(currentPage), Number(pageLimit), filter);
    }

    if (stepdown) {
      return steppedDownInvoices(Number(currentPage), Number(pageLimit), stepdown);
    }

    if (Object.values(body).length) {
      return getInvoices(Number(currentPage), Number(pageLimit));
    }

    return getInvoices();
  }

  /**
   * approve invoice
   *
   * @static
   * @returns {json} json object with invoice data
   * @param body
   * @memberOf InvoiceService
   */
  static async approveInvoiceService(body) {
    const approvedInvoice = await approveInvoice(body);
    // Audit Log
    const content = `${body.staff.fullname} approved ${approvedInvoice.name} invoice`;
    await auditLog(content, body.staff.sub);

    return approvedInvoice;
  }

  /**
   * decline invoice
   *
   * @static
   * @returns {json} json object with invoice data
   * @param body
   * @memberOf InvoiceService
   */
  static async declineInvoiceService(body) {
    const declinedInvoice = await declineInvoice(body);
    // Audit Log
    const content = `${body.staff.fullname} declined ${declinedInvoice.name} invoice`;
    await auditLog(content, body.staff.sub);

    return declinedInvoice;
  }

  /**
   * stepdown invoice
   *
   * @static
   * @returns {json} json object with invoice data
   * @param body
   * @memberOf InvoiceService
   */
  static async stepDownInvoiceService(body) {
    const steppedInvoice = await stepDownInvoice(body);
    // Audit Log
    const content = `${body.staff.fullname} stepped down ${steppedInvoice.name} invoice`;
    await auditLog(content, body.staff.sub);

    return steppedInvoice;
  }

  /**
   * create waybill
   *
   * @static
   * @returns {json} json object with waybill data
   * @param body
   * @memberOf InvoiceService
   */
  static async createWaybillService(body) {
    const waybill = await createWaybill(body);
    // Audit Log
    const content = `${body.fullname} created ${waybill.name} waybill`;
    await auditLog(content, body.sid);

    return waybill;
  }

  /**
   * get waybills
   *
   * @static
   * @returns {json} json object with waybills data
   * @param body
   * @memberOf InvoiceService
   */
  static async getWaybills(body) {
    const { currentPage, pageLimit, search } = body;
    if (search) {
      return searchWaybill(Number(currentPage), Number(pageLimit), search);
    }

    if (Object.values(body).length) {
      return getWaybills(Number(currentPage), Number(pageLimit));
    }

    return getWaybills();
  }

  /**
   * update waybill
   *
   * @static
   * @returns {json} json object with waybill data
   * @param body
   * @memberOf InvoiceService
   */
  static async updateWaybillService(body) {
    const waybill = await updateWaybill(body);
    // Audit Log
    const content = `${body.staff.fullname} updated ${waybill.name} waybill`;
    await auditLog(content, body.staff.sub);

    return waybill;
  }
}
export default InvoiceService;
