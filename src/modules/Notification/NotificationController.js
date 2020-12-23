/* eslint-disable camelcase */
import {
  getNotifications,
  getStaffAuditLog,
  getUnreadNotificationCount,
  readNotification,
} from './notificationRepository';

class NotificationController {
  /**
   * get a staff audit logs
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoices data
   */
  static async getStaffAuditLog(req, res, next) {
    const { pageLimit } = req.query;

    try {
      const logs = await getStaffAuditLog(Number(pageLimit), req.user.sub);

      return res.status(200).json({
        message: 'Data retrieved',
        data: logs,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get a staff audit logs
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoices data
   */
  static async getStaffNotifications(req, res, next) {
    const { pageLimit } = req.query;

    try {
      const notifications = await getNotifications(Number(pageLimit), req.user.sub);

      return res.status(200).json({
        message: 'Data retrieved',
        data: notifications,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get a staff notification count
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoices data
   */
  static async getUnreadNotificationCount(req, res, next) {
    try {
      const count = await getUnreadNotificationCount(req.user.sub);

      return res.status(200).json({
        message: 'Data retrieved',
        data: count,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * read notification
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with invoices data
   */
  static async readNotification(req, res, next) {
    const { notification_id } = req.body;
    if (!notification_id) return res.status(400).json('Notification id required');

    try {
      const notification = await readNotification(notification_id);

      return res.status(200).json({
        message: 'Success',
        data: notification,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default NotificationController;
