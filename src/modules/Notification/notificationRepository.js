/* eslint-disable camelcase */
const { AuditLog, Notification } = require('../../database/models');

/**
 * create auditLog
 *
 * @function
 * @returns {json} json object with audit log data
 * @param data
 * @param staff
 */
export async function createLog(data, staff) {
  return AuditLog.create({
    sid: staff,
    content: data,
  });
}

/**
 * create notification
 *
 * @function
 * @returns {json} json object with notification data
 * @param data
 */
export async function createNotification(data) {
  return Notification.create({
    sid: data.sid,
    content: data.content,
    type: data.type,
    title: data.title,
    category: data.category,
  });
}

/**
 * create group notification
 *
 * @function
 * @returns {json} json object with notification data
 * @param data
 */
export async function createGroupNotification(data) {
  const items = data.staff.map(detail => ({
    ...data,
    sid: detail,
  }));

  return Notification.bulkCreate(items);
}

/**
 * get notification by id
 *
 * @function
 * @returns {json} json object with notification data
 * @param data
 */
export async function getNotificationById(data) {
  return Notification.findByPk(data);
}

/**
 * get notification count
 *
 * @function
 * @returns {json} json object with notification count
 * @param staff_id
 */
export async function getUnreadNotificationCount(staff_id) {
  return Notification.count({ where: { is_read: 0, sid: staff_id } });
}

/**
 * read notification
 *
 * @function
 * @returns {json} json object with notification data
 * @param data
 */
export async function readNotification(data) {
  const notification = await getNotificationById(data);
  return notification.update({ read_at: Date.now(), is_read: 1 });
}

/**
 * get items
 *
 * @function
 * @returns {json} json object with items data
 * @param pageLimit
 * @param staff_id
 */
export async function getStaffAuditLog(pageLimit = 10, staff_id) {
  return AuditLog.paginate({
    page: 1,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      sid: staff_id,
    },
  });
}

/**
 * get notifications
 *
 * @function
 * @returns {json} json object with items data
 * @param pageLimit
 * @param staff_id
 */
export async function getNotifications(pageLimit = 10, staff_id) {
  return Notification.paginate({
    page: 1,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    where: {
      sid: staff_id,
    },
  });
}
