/**
 * Customer controller handles all requests that has to do with customer
 *
 * - createCustomer - allow customers to create a new account
 * - loginStaff - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like firstname, lastname, email, password, phone
 */
import { validateCustomer, validateUpdateCustomer } from './validations';
import CustomerService from './CustomerService';
import { getCustomerById } from './customerRepository';

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
  /**
   * create a customer record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   */
  static async createCustomer(req, res, next) {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const customer = await CustomerService.createCustomerService(
        Object.assign(req.body, { sid: req.user.sub })
      );

      return res.status(201).json({
        message: 'Successful, customer account created!',
        data: customer,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get one customer profile
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with customer profile data
   */
  static async getOneCustomer(req, res, next) {
    try {
      const customer = await getCustomerById(req.params.id);
      if (!customer) return res.status(404).json('Customer not found');

      return res.status(200).json({
        message: 'Success',
        data: customer,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update customer profile data such as name, email, phone, etc
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with customer profile data
   */
  static async updateCustomerProfile(req, res, next) {
    const { cid } = req.body;
    if (!cid) return res.status(400).json('Customer id required');

    try {
      const customer = await CustomerService.updateCustomerService(req.body);

      return res.status(200).json({
        message: 'Customer details updated successfully',
        data: customer,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all staffs
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with staffs data
   */
  static async getCustomers(req, res, next) {
    try {
      const customers = await CustomerService.getCustomers(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: customers,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default CustomerController;
