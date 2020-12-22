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
import { auditLog } from '../../command/schedule';

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

    const user = await createUser(body);
    // Audit Log
    const content = `${body.fullname} created ${user.fullname} staff account`;
    await auditLog(content, body.sid);

    return user;
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

    // Audit Log
    const content = `${
      staff.fullname
    } last logged in on ${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`;
    await auditLog(content, staff.sid);

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
    const staff = await updateStaff(body);
    // Audit Log
    const content = `${body.staff.fullname} updated ${staff.fullname} staff account`;
    await auditLog(content, body.staff.sub);

    return staff;
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
   * @memberOf StaffService
   */
  static async changePasswordService(body) {
    const staff = await getStaffById(body.staff.sub);
    if (!staff) throw new Error('Invalid user id');

    const { newPassword, oldPassword, confirmPassword } = body;
    if (newPassword !== confirmPassword)
      throw new Error('Your new password must be the same with confirm password');

    const isSamePassword = await bcrypt.compare(oldPassword, staff.password);
    if (!isSamePassword) throw new Error('Old password not correct');

    const salt = await bcrypt.genSalt(12);
    staff.password = await bcrypt.hash(newPassword, salt);
    await staff.save();

    // Audit Log
    const female = `${body.staff.fullname} changed her password`;
    const male = `${body.staff.fullname} changed his password`;
    await auditLog(staff.gender === 'Female' ? female : male, body.staff.sub);

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

    // Audit Log
    const content = `${body.staff.fullname} requested for a forgot password`;
    await auditLog(content, body.staff.sub);

    return staff;
  }
}
export default StaffService;
