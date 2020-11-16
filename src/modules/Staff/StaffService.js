import bcrypt from 'bcryptjs';
import {
  createUser,
  filterStaffs,
  findStaffByPhone,
  findStaffByPhoneOrUsername,
  findStaffByUsername,
  getStaffById,
  getStaffs,
  searchStaffs,
  updateStaff,
} from './staffRepository';

const uuidv1 = require('uuid/v4');

class StaffService {
  /**
   * create staff account
   *
   * @static
   * @returns {json} json object with staff data
   * @param body
   * @memberOf StaffService
   */
  static async createUserService(body) {
    const staff = await findStaffByPhoneOrUsername({ phone: body.phone, username: body.username });
    if (staff) throw new Error('Staff already exists');

    return createUser(body);
  }

  /**
   * login staff account
   *
   * @static
   * @returns {json} json object with staff data
   * @param body
   * @memberOf StaffService
   */
  static async staffLoginService(body) {
    const staff = await findStaffByUsername(body);
    if (!staff) throw new Error('Invalid username');

    const validPassword = await bcrypt.compare(body.password, staff.password);
    if (!validPassword) throw new Error('Invalid password');

    const token = staff.generateAuthToken();

    return {
      token,
      staff,
    };
  }

  /**
   * update staff account
   *
   * @static
   * @returns {json} json object with staff data
   * @param body
   * @memberOf StaffService
   */
  static async updateStaffService(body) {
    return updateStaff(body);
  }

  /**
   * get staffs
   *
   * @static
   * @returns {json} json object with staffs data
   * @param body
   * @memberOf StaffService
   */
  static async getStaffs(body) {
    const { currentPage, pageLimit, search, filter } = body;
    if (search) {
      return searchStaffs(Number(currentPage), Number(pageLimit), search);
    }

    if (filter) {
      return filterStaffs(Number(currentPage), Number(pageLimit), filter);
    }

    if (Object.values(body).length) {
      return getStaffs(Number(currentPage), Number(pageLimit));
    }

    return getStaffs();
  }

  /**
   * change user password
   *
   * @static
   * @returns {json} json object with user data
   * @param body
   * @param sub
   * @memberOf StaffService
   */
  static async changePasswordService(body, sub) {
    const staff = await getStaffById(sub);
    if (!staff) throw new Error('Invalid user id');

    const { newPassword, oldPassword, confirmPassword } = body;
    if (newPassword !== confirmPassword)
      throw new Error('Your new password must be the same with confirm password');

    const isSamePassword = await bcrypt.compare(oldPassword, staff.password);
    if (!isSamePassword) throw new Error('Old password not correct');

    const salt = await bcrypt.genSalt(16);
    staff.password = await bcrypt.hash(newPassword, salt);
    await staff.save();

    return staff;
  }

  /**
   * change user password
   *
   * @static
   * @returns {json} json object with user data
   * @param body
   * @memberOf StaffService
   */
  static async forgotPasswordService(body) {
    const staff = await findStaffByPhone(body);
    if (!staff) throw new Error('Phone number not found');

    const uniq = uuidv1();
    const tempPassword = uniq.substr(uniq.length - 7).toUpperCase();

    const salt = await bcrypt.genSalt(16);
    staff.password = await bcrypt.hash(tempPassword, salt);
    await staff.save();

    return staff;
  }
}
export default StaffService;
