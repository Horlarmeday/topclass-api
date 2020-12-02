import { Router } from 'express';
import DashboardController from './DashboardController';
import verify from '../../middleware/verify';

const router = Router();
router.get('/accountant/sales', verify, DashboardController.getSales);
router.get('/accountant/invoices', verify, DashboardController.getInvoices);

export default router;
