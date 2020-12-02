import { creditors, getOneSale, staffCreditors } from './saleRepository';
import SaleService from './SaleService';
import { validatePayment } from './validations';

/**
 *
 *
 * @class SaleController
 */
class SaleController {
  // /**
  //  * create a sale record
  //  *
  //  * @static
  //  * @param {object} req express request object
  //  * @param {object} res express response object
  //  * @param {object} next next middleware
  //  * @returns {json} json object with status, service data
  //  */
  // static async createService(req, res, next) {
  //   const { error } = validateSale(req.body);
  //   if (error) return res.status(400).json(error.details[0].message);
  //
  //   try {
  //     const sale = await SaleService.createSaleService(
  //       Object.assign(req.body, { sid: req.user.sub })
  //     );
  //
  //     return res.status(201).json({
  //       message: 'Successful, sale created!',
  //       data: sale,
  //     });
  //   } catch (e) {
  //     return next(e);
  //   }
  // }

  /**
   * get one sale
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with sales data
   */
  static async getOneSale(req, res, next) {
    try {
      const sale = await getOneSale(req.params.id);
      if (!sale) return res.status(404).json('Unknown Resource');

      return res.status(200).json({
        message: 'Success',
        data: sale,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update sale
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with sale data
   */
  static async updateSale(req, res, next) {
    const { slid } = req.body;
    if (!slid) return res.status(400).json('Sale id required');

    try {
      const sale = await SaleService.updateSaleService(req.body);

      return res.status(200).json({
        message: 'Data updated successfully',
        data: sale,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all Sales
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with sales data
   */
  static async getSales(req, res, next) {
    let sales;

    try {
      if (req.query.data) {
        sales = await SaleService.getSalesService(Object.assign(req.query, { data: req.user.sub }));
      } else sales = await SaleService.getSalesService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: sales,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all creditors
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with creditors data
   */
  static async getCreditors(req, res, next) {
    const { currentPage, pageLimit } = req.query;
    try {
      const sales = await creditors(Number(currentPage), Number(pageLimit));

      return res.status(200).json({
        message: 'Data retrieved',
        data: sales,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get staff creditors
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with creditors data
   */
  static async getStaffCreditors(req, res, next) {
    const { currentPage, pageLimit } = req.query;
    try {
      const sales = await staffCreditors(Number(currentPage), Number(pageLimit), req.user.sub);

      return res.status(200).json({
        message: 'Data retrieved',
        data: sales,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * create a sale record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, service data
   */
  static async createPayment(req, res, next) {
    const { error } = validatePayment(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const payment = await SaleService.createPaymentService(
        Object.assign(req.body, { sid: req.user.sub })
      );

      return res.status(201).json({
        message: 'Successful, payment added!',
        data: payment,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * generate a receipt
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, receipt data
   */
  static async generateReceipt(req, res, next) {
    try {
      const receipt = await SaleService.generateReceiptService(
        Object.assign(req.body, { sid: req.user.sub, slid: req.params.id })
      );

      return res.status(201).json({
        message: 'Successful, receipt generated!',
        data: receipt,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default SaleController;
