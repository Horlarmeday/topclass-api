/**
 * Product controller handles all requests that has to do with products
 *
 * - createProduct - allow products to create a new account
 * - getOneProduct - allow products to login to their account
 * - getProducts - allow products to view their profile info
 * - updateProduct - allow products to update
 */
import { validateService } from './validations';
import { getServiceById } from './serviceRepository';
import ServiceService from './ServiceService';

/**
 *
 *
 * @class ServiceController
 */
class ServiceController {
  /**
   * create a service record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, service data
   */
  static async createService(req, res, next) {
    const { error } = validateService(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const service = await ServiceService.createServiceService(
        Object.assign(req.body, { sid: req.user.sub })
      );

      return res.status(201).json({
        message: 'Successful, service created!',
        data: service,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get one service
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with service data
   */
  static async getOneService(req, res, next) {
    try {
      const service = await getServiceById(req.params.id);
      if (!service) return res.status(404).json('Service not found');

      return res.status(200).json({
        message: 'Success',
        data: service,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update service
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with service data
   */
  static async updateService(req, res, next) {
    const { svid } = req.body;
    if (!svid) return res.status(400).json('Service id required');

    try {
      const service = await ServiceService.updateServiceService(req.body);

      return res.status(200).json({
        message: 'Data updated successfully',
        data: service,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all Services
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with services data
   */
  static async getServices(req, res, next) {
    try {
      const services = await ServiceService.getServicesService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: services,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default ServiceController;
