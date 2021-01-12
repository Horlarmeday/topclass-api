/**
 * Staff controller handles all requests that has to do with customer
 *
 * - createStaff - allow staffs to create a new account
 * - loginStaff - allow staffs to login to their account
 * - getStaffProfile - allow staffs to view their profile info
 * - updateStaffProfile - allow staffs to update their profile info like fullname, email, password, phone
 * - addDebitCard - allow staffs to add their debit card
 */
import _ from 'lodash';
import { validateForgotPassword, validateStaff, validateStaffLogin } from './validations';
import StaffService from './StaffService';
import { getStaffById } from './staffRepository';
/**
 *
 *
 * @class StaffController
 */
class StaffController {
  /**
   * create a staff record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, staff data and access token
   */
  static async createStaff(req, res, next) {
    const { error } = validateStaff(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    console.log(req.user)

    try {
      const staff = await StaffService.createUserService(
        Object.assign(req.body, { staff_id: req.user.sub, name: req.user.fullname })
      );

      return res.status(201).json({
        message: 'Successful, account created!',
        data: _.pick(staff, [
          'sid',
          'fullname',
          'email',
          'phone',
          'status',
          'createdAt',
          'username',
          'role',
        ]),
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * login a staff
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, staff data and access token
   */
  static async loginStaff(req, res, next) {
    const { error } = validateStaffLogin(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const { token, staff } = await StaffService.staffLoginService(req.body);

      return res.status(200).json({
        message: 'Login successful!',
        token,
        data: _.pick(staff, ['sid', 'fullname', 'email', 'phone', 'username']),
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * show staff profile
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with staff profile data
   */
  static async getStaffProfile(req, res, next) {
    try {
      const staff = await getStaffById(req.user.sub);
      if (!staff) return res.status(404).json('Invalid staff id');

      return res.status(200).json({
        message: 'Success',
        data: staff,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get one user profile
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with staff profile data
   */
  static async getOneStaff(req, res, next) {
    try {
      const staff = await getStaffById(req.params.id);
      if (!staff) return res.status(404).json('User not found');

      return res.status(200).json({
        message: 'Success',
        data: staff,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update staff profile data such as name, email, phone, etc
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with staff profile data
   */
  static async updateStaffProfile(req, res, next) {
    try {
      const staff = await StaffService.updateStaffService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Profile updated successfully',
        data: staff,
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
  static async getStaffs(req, res, next) {
    try {
      const staffs = await StaffService.getStaffs(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: staffs,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * change staff password
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with staffs data
   */
  static async changePassword(req, res, next) {
    try {
      const staff = await StaffService.changePasswordService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Password changed!',
        data: staff,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * forgot password
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with staff data
   */
  static async forgotPassword(req, res, next) {
    const { error } = validateForgotPassword(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const staff = await StaffService.forgotPasswordService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'A new password has been sent to your phone!',
        data: staff,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default StaffController;
