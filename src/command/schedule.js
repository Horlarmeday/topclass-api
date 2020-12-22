import Constant from '../helpers/constants';

const agenda = require('./agenda');

/**
 * schedule audit log
 * @param content
 * @param staff
 * @returns {Promise<void>}
 */
export async function auditLog(content, staff) {
  await agenda.schedule('in 20 seconds', Constant.AUDIT_LOG, {
    content,
    staff,
  });
}

/**
 * schedule create notification
 * @param content
 * @param staff
 * @param title
 * @param type
 * @param category
 * @returns {Promise<void>}
 */
export async function systemNotification({ content, staff, title, type, category }) {
  await agenda.schedule('in 5 seconds', Constant.NOTIFICATION, {
    content,
    staff,
    title,
    type,
    category,
  });
}

/**
 * schedule group create notification
 *
 * @param content
 * @param staff
 * @param title
 * @param type
 * @param category
 * @returns {Promise<void>}
 */
export async function groupSystemNotification({ content, staff, title, type, category }) {
  await agenda.schedule('in 5 seconds', Constant.GROUP_NOTIFICATION, {
    content,
    staff,
    title,
    type,
    category,
  });
}
