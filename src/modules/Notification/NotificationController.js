import { getStaffAuditLog } from './notificationRepository';

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
}
export default NotificationController;
