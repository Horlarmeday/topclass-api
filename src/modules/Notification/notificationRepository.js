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
