/* eslint-disable camelcase */
import { validateInvoice, validateWaybill } from './validations';
import InvoiceService from './InvoiceService';
import { getInvoiceItems, getOneInvoice, getOneWaybill } from './invoiceRepository';

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
        Object.assign(req.body, { sid: req.user.sub, fullname: req.user.fullname })
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
   * get invoice items
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoice items data
   */
  static async getInvoiceItems(req, res, next) {
    try {
      const items = await getInvoiceItems(req.body.ivid);

      return res.status(200).json({
        message: 'Success',
        data: items,
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
      const invoice = await InvoiceService.updateInvoiceService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Data updated successfully',
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
  static async dispenseItem(req, res, next) {
    const { inv_id } = req.body;
    if (!inv_id) return res.status(400).json('Invoice id required');

    try {
      const invoice = await InvoiceService.dispenseItemService(
        Object.assign(req.body, { staff: req.user })
      );

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
      const invoice = await InvoiceService.deleteInvoiceService(
        Object.assign(req.body, { staff: req.user })
      );

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

  /**
   * approve invoice
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoice data
   */
  static async approveInvoice(req, res, next) {
    const { invoice_id } = req.body;
    if (!invoice_id) return res.status(400).json('Invoice id is required');

    try {
      const invoice = await InvoiceService.approveInvoiceService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'invoice approved successfully',
        data: invoice,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * decline invoice
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoice data
   */
  static async declineInvoice(req, res, next) {
    const { invoice_id, comment } = req.body;
    if (!invoice_id && !comment) return res.status(400).json('Invoice id and comment are required');

    try {
      const invoice = await InvoiceService.declineInvoiceService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'invoice declined!',
        data: invoice,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * step down invoice
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoice data
   */
  static async stepDownInvoice(req, res, next) {
    const { invoice_id } = req.body;
    if (!invoice_id) return res.status(400).json('Invoice id required');

    try {
      const invoice = await InvoiceService.stepDownInvoiceService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'invoice stepped down!',
        data: invoice,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create a waybill
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, waybill data
   */
  static async createWaybill(req, res, next) {
    const { error } = validateWaybill(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const waybill = await InvoiceService.createWaybillService(
        Object.assign(req.body, { sid: req.user.sub, fullname: req.user.fullname })
      );

      return res.status(201).json({
        message: 'Successful, waybill created!',
        data: waybill,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all waybills
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with waybills data
   */
  static async getWaybills(req, res, next) {
    try {
      const waybills = await InvoiceService.getWaybills(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: waybills,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get one waybill
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with waybill data
   */
  static async getOneWaybill(req, res, next) {
    try {
      const waybill = await getOneWaybill(req.params.id);
      if (!waybill) return res.status(404).json('Waybill not found');

      return res.status(200).json({
        message: 'Success',
        data: waybill,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update waybill data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with waybill data
   */
  static async updateWaybill(req, res, next) {
    const { wyid } = req.body;
    if (!wyid) return res.status(400).json('Invoice id required');

    try {
      const waybill = await InvoiceService.updateWaybillService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Data updated successfully',
        data: waybill,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default InvoiceController;
