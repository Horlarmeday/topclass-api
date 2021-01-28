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
  dispenseItem,
  getItemById,
  createDispenseHistory,
  getPendingItemsCount,
  invoiceDispensed,
  unDispensedInvoices,
  approvedNotSteppedDownInvoices,
  getInvoiceByDate,
  getInvoiceById,
} from './invoiceRepository';
import { getSettingByName } from '../Utility/utilityRepository';
import Constant from '../../helpers/constants';
import Role from '../../helpers/roles';

import { auditLog, groupSystemNotification, systemNotification } from '../../command/schedule';
import { getProductById, updateProductQuantity } from '../Product/productRepository';
import { getStaffByOneRole } from '../Staff/staffRepository';

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
    const notification = `${body.fullname} needs approval for ${body.invoice_type} created`;
    const staff = getStaffByOneRole(Role.SUPERADMIN);

    if (body.should_include_vat) {
      const vat = await getSettingByName(Constant.VAT);
      const total = body.product.map(cost => Number(cost.price)).reduce((a, b) => a + b, 0);
      const vatPrice = (Number(vat.value) / 100) * total;

      const createdInvoice = await createInvoice(body, vatPrice);

      await groupSystemNotification({
        content: notification,
        staff,
        title: 'Invoice Approval Needed',
        type: Constant.GROUP,
        category: Constant.NEW_NOTIFICATION,
      });
      await auditLog(content, body.sid);
      return createdInvoice;
    }

    await groupSystemNotification({
      content: notification,
      staff,
      title: 'Invoice Approval Needed',
      type: Constant.GROUP,
    });
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

    this.changeInvoiceToDispensed(updatedItem);
    const { cid } = await getInvoiceById(item.ivid);

    this.createDispenseHistory({ product, item, staff: body.staff.sub, leftOver, cid });

    // Audit Log
    const content = `${body.staff.fullname} dispensed ${updatedItem.item}`;
    await auditLog(content, body.staff.sub);

    return updatedItem;
  }

  /**
   *
   * @param item
   * @returns {Promise<void>}
   */
  static async changeInvoiceToDispensed(item) {
    // get pending items and change invoice to is_dispensed
    const items = await getPendingItemsCount(item.ivid);
    if (items === 0) await invoiceDispensed(item.ivid);
  }

  /**
   *
   * @param product
   * @param item
   * @param staff
   * @param leftOver
   * @param cid - customer id
   * @returns {Promise<void>}
   */
  static async createDispenseHistory({ product, item, staff, leftOver, cid }) {
    // update product quantity and dispense history
    await updateProductQuantity(product, leftOver);
    await createDispenseHistory(item, leftOver, staff, cid);
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
    const { currentPage, pageLimit, search, filter, stepdown, dispense, start, end } = body;
    if (search) {
      return searchInvoices(Number(currentPage), Number(pageLimit), search);
    }

    if (filter) {
      return filterInvoices(Number(currentPage), Number(pageLimit), filter);
    }

    if (start && end) {
      return getInvoiceByDate(Number(currentPage), Number(pageLimit), start, end);
    }

    if (stepdown) {
      return approvedNotSteppedDownInvoices(Number(currentPage), Number(pageLimit), stepdown);
    }

    if (dispense) {
      return unDispensedInvoices(Number(currentPage), Number(pageLimit), dispense);
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
    const staff = await getStaffByOneRole(Role.ACCOUNTANT);
    const notification = `${approvedInvoice.name} invoice has been approved`;

    await groupSystemNotification({
      content: notification,
      staff: [...staff, approvedInvoice.sid],
      title: 'Invoice Approved',
      type: Constant.GROUP,
      category: Constant.APPROVED,
    });
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
    const notification = `${declinedInvoice.name} invoice has been declined: Reason - $${declinedInvoice.comment}`;

    await systemNotification({
      content: notification,
      staff: declinedInvoice.sid,
      title: 'Invoice Declined',
      type: Constant.INDIVIDUAL,
      category: Constant.DECLINED,
    });
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
