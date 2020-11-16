import { Sequelize } from 'sequelize';

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
  return Staff.create(data);
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
