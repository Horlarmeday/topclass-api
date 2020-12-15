import { Router } from 'express';
import ReportController from './ReportController';
import verify from '../../middleware/verify';

const router = Router();
router.get('/revenue-report', verify, ReportController.getRevenueReport);
router.get('/expenses-report', verify, ReportController.getExpensesReport);
router.get('/inventory-report', verify, ReportController.getInventoryReport);
export default router;
