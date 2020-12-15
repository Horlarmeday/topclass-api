import { Router } from 'express';
import NotificationController from './NotificationController';
import verify from '../../middleware/verify';

const router = Router();
router.get('/logs', verify, NotificationController.getStaffAuditLog);

export default router;
