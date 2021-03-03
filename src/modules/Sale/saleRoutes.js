import { Router } from 'express';
import SaleController from './SaleController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/payment', verify, SaleController.createPayment);
router.post('/receipt', verify, SaleController.generateReceipt);
router.put('/', verify, SaleController.updateSale);
router.put('/discount', verify, SaleController.applyDiscount);
router.get('/', verify, SaleController.getSales);
router.get('/debtors', verify, SaleController.getCreditors);
router.get('/payments', verify, SaleController.getPayments);
router.get('/staff-debtors', verify, SaleController.getStaffCreditors);
router.get('/:id', verify, SaleController.getOneSale);
router.get('/payments/:id', verify, SaleController.getOnePayment);

export default router;
