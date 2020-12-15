import {
  accountantCard,
  superAdminCard,
  secretaryCard,
  adminCard,
  storeKeeperCard,
  workshopCard,
} from './dashboardRepository';

/**
 *
 *
 * @class DashboardController
 */
class DashboardController {
  /** *********************
   /// ACCOUNTANT DASHBOARD
   /*************************

   /**
   * get header cards figures
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with card data
   */
  static async accountantCardData(req, res, next) {
    try {
      const data = await accountantCard();

      return res.status(200).json({
        message: 'Success',
        data,
      });
    } catch (e) {
      return next(e);
    }
  }

  /** *********************
   /// SUPER ADMIN DASHBOARD
   /*************************
   /**
   * get header cards figures
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with card data
   */
  static async superAdminCardData(req, res, next) {
    try {
      const data = await superAdminCard();

      return res.status(200).json({
        message: 'Success',
        data,
      });
    } catch (e) {
      return next(e);
    }
  }

  /** *********************
   /// ADMIN DASHBOARD
   /*************************
   /**
   * get header cards figures
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with card data
   */
  static async adminCardData(req, res, next) {
    try {
      const data = await adminCard();

      return res.status(200).json({
        message: 'Success',
        data,
      });
    } catch (e) {
      return next(e);
    }
  }

  /** *********************
   /// SECRETARY DASHBOARD
   /*************************
   /**
   * get header cards figures
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with card data
   */
  static async secretaryCardData(req, res, next) {
    try {
      const data = await secretaryCard(req.user.sub);

      return res.status(200).json({
        message: 'Success',
        data,
      });
    } catch (e) {
      return next(e);
    }
  }

  /** *********************
   /// STORE DASHBOARD
   /*************************
   /**
   * get header cards figures
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with card data
   */
  static async storeKeeperCardData(req, res, next) {
    try {
      const data = await storeKeeperCard(req.user.sub);

      return res.status(200).json({
        message: 'Success',
        data,
      });
    } catch (e) {
      return next(e);
    }
  }

  /** *********************
   /// WORKSHOP DASHBOARD
   /*************************
   /**
   * get header cards figures
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with card data
   */
  static async workshopCardData(req, res, next) {
    try {
      const data = await workshopCard(req.user.sub);

      return res.status(200).json({
        message: 'Success',
        data,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default DashboardController;
