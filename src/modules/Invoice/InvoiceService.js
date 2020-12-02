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
} from './invoiceRepository';
import { getSettingByName } from '../Utility/utilityRepository';

import SettingInterface from '../../helpers/contants';

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
    if (body.should_include_vat) {
      const vat = await getSettingByName(SettingInterface.VAT);
      const total = body.product.map(cost => Number(cost.price)).reduce((a, b) => a + b, 0);
      const vatPrice = (Number(vat.value) / 100) * total;
      return createInvoice(body, vatPrice);
    }

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
    return updateInvoice(body);
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
    return deleteInvoice(body.ivid);
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
    const { currentPage, pageLimit, search, filter } = body;
    if (search) {
      return searchInvoices(Number(currentPage), Number(pageLimit), search);
    }

    if (filter) {
      return filterInvoices(Number(currentPage), Number(pageLimit), filter);
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
    return approveInvoice(body);
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
    return declineInvoice(body);
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
    return stepDownInvoice(body);
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
    return createWaybill(body);
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
    return updateWaybill(body);
  }
}
export default InvoiceService;
