import {
  createInvoice,
  filterInvoices,
  getInvoices,
  searchInvoices,
  updateInvoice,
  deleteInvoice,
} from './invoiceRepository';

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
}
export default InvoiceService;
