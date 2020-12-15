import { Router } from 'express';
import DashboardController from './DashboardController';
import verify from '../../middleware/verify';

const router = Router();
router.get('/accountant', verify, DashboardController.accountantCardData);
router.get('/superadmin', verify, DashboardController.superAdminCardData);
router.get('/secretary', verify, DashboardController.secretaryCardData);
router.get('/store-keeper', verify, DashboardController.storeKeeperCardData);
router.get('/workshop', verify, DashboardController.workshopCardData);
router.get('/admin', verify, DashboardController.adminCardData);

export default router;
