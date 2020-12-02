import { Router } from 'express';
import SaleController from './SaleController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/payment', verify, SaleController.createPayment);
router.post('/receipt', verify, SaleController.generateReceipt);
router.put('/', verify, SaleController.updateSale);
router.get('/', verify, SaleController.getSales);
router.get('/creditors', verify, SaleController.getCreditors);
router.get('/staff-creditors', verify, SaleController.getStaffCreditors);
router.get('/:id', verify, SaleController.getOneSale);

export default router;
