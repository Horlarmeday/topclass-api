import { Router } from 'express';
import NotificationController from './NotificationController';
import verify from '../../middleware/verify';

const router = Router();
router.get('/logs', verify, NotificationController.getStaffAuditLog);
router.get('/notifications', verify, NotificationController.getStaffNotifications);
router.get('/count', verify, NotificationController.getUnreadNotificationCount);
router.put('/read-notification', verify, NotificationController.readNotification);

export default router;
