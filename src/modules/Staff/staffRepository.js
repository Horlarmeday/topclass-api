/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import _ from 'lodash';

const { Staff } = require('../../database/models');

const { Op } = Sequelize;

/**
 * create staff account in the DB
 *
 * @function
 * @returns {json} json object with staff data
 * @param data
 */
export async function createUser(data) {
  const {
    fullname,
    email,
    phone,
    password,
    role,
    username,
    gender,
    guarantor_name,
    guarantor_phone,
  } = data;
  return Staff.create({
    fullname,
    email,
    phone,
    password,
    role,
    username,
    gender,
    guarantor_name,
    guarantor_phone,
  });
}

/**
 * query user account in the DB by phone or username
 *
 * @function
 * @returns {json} json object with staff data
 * @param data
 */
export async function findStaffByPhoneOrUsername(data) {
  return Staff.findOne({
    where: { [Op.or]: [{ phone: data.phone }, { username: data.username }] },
  });
}

/**
 * query user account in the DB by username
 *
 * @function
 * @returns {json} json object with staff data
 * @param data
 */
export async function findStaffByUsername(data) {
  return Staff.findOne({ where: { username: data.username } });
}

/**
 * query user account in the DB by phone
 *
 * @function
 * @returns {json} json object with staff data
 * @param data
 */
export async function findStaffByPhone(data) {
  return Staff.findOne({ where: { phone: data.phone } });
}

/**
 * query user account in the DB by staff id
 *
 * @function
 * @returns {json} json object with staff data
 * @param data
 */
export async function getStaffById(data) {
  return Staff.findByPk(data);
}

/**
 * query staff account role
 *
 * @function
 * @returns {json} json object with staff data
 * @param firstRole
 * @param secondRole
 */
export async function getStaffByTwoRole(firstRole, secondRole) {
  const staffs = await Staff.findAll({
    where: { [Op.or]: [{ role: firstRole }, { role: secondRole }] },
    attributes: ['sid'],
  });

  return _.map(staffs, staff => staff.sid);
}

/**
 * query staff account role
 *
 * @function
 * @returns {json} json object with staff data
 * @param role
 */
export async function getStaffByOneRole(role) {
  const staffs = await Staff.findAll({
    where: { role },
    attributes: ['sid'],
  });

  return _.map(staffs, staff => staff.sid);
}

/**
 * update staff
 *
 * @function
 * @returns {json} json object with staff data
 * @param data
 */
export async function updateStaff(data) {
  const staff = await getStaffById(data.sid);
  return staff.update(data);
}

/**
 * get staffs
 *
 * @function
 * @returns {json} json object with staffs data
 * @param currentPage
 * @param pageLimit
 */
export async function getStaffs(currentPage = 1, pageLimit = 10) {
  return Staff.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['password'] },
  });
}

/**
 * filter staffs
 *
 * @function
 * @returns {json} json object with staffs data
 * @param currentPage
 * @param pageLimit
 * @param filter
 */
export async function filterStaffs(currentPage = 1, pageLimit = 10, filter) {
  return Staff.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['password'] },
    where: {
      status: filter,
    },
  });
}

/**
 * search staffs
 *
 * @function
 * @returns {json} json object with staffs data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchStaffs(currentPage = 1, pageLimit = 10, search) {
  return Staff.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['password'] },
    where: {
      [Op.or]: [
        {
          fullname: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          username: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });
}
