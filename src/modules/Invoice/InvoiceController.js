import { validateInvoice } from './validations';
import InvoiceService from './InvoiceService';
import { getInvoiceById, getOneInvoice } from './invoiceRepository';

/**
 *
 *
 * @class InvoiceController
 */
class InvoiceController {
  /**
   * create an invoice
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, invoice data
   */
  static async createInvoice(req, res, next) {
    const { error } = validateInvoice(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const invoice = await InvoiceService.createInvoiceService(
        Object.assign(req.body, { sid: req.user.sub })
      );

      return res.status(201).json({
        message: 'Successful, invoice created!',
        data: invoice,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get one invoice
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoice data
   */
  static async getOneInvoice(req, res, next) {
    try {
      const invoice = await getOneInvoice(req.params.id);
      if (!invoice) return res.status(404).json('Invoice not found');

      return res.status(200).json({
        message: 'Success',
        data: invoice,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update invoice data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoice data
   */
  static async updateInvoice(req, res, next) {
    const { ivid } = req.body;
    if (!ivid) return res.status(400).json('Invoice id required');

    try {
      const invoice = await InvoiceService.updateInvoiceService(req.body);

      return res.status(200).json({
        message: 'Data updated successfully',
        data: invoice,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * delete invoice data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoice data
   */
  static async deleteInvoice(req, res, next) {
    const { ivid } = req.body;
    if (!ivid) return res.status(400).json('Invoice id required');

    try {
      const invoice = await InvoiceService.deleteInvoiceService(req.body);

      return res.status(200).json({
        message: 'Invoice deleted successfully',
        data: invoice,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all invoices
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoices data
   */
  static async getInvoices(req, res, next) {
    try {
      const invoices = await InvoiceService.getInvoices(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: invoices,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default InvoiceController;
