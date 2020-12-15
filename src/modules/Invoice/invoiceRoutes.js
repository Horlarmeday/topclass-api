import { Router } from 'express';
import InvoiceController from './InvoiceController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/create', verify, InvoiceController.createInvoice);
router.post('/waybill/create', verify, InvoiceController.createWaybill);
router.post('/items', verify, InvoiceController.getInvoiceItems);
router.put('/', verify, InvoiceController.updateInvoice);
router.put('/approve', verify, InvoiceController.approveInvoice);
router.put('/decline', verify, InvoiceController.declineInvoice);
router.put('/stepdown', verify, InvoiceController.stepDownInvoice);
router.put('/waybill', verify, InvoiceController.updateWaybill);
router.put('/dispense', verify, InvoiceController.dispenseItem);
router.get('/', verify, InvoiceController.getInvoices);
router.get('/waybill', verify, InvoiceController.getWaybills);
router.get('/waybill/:id', verify, InvoiceController.getOneWaybill);
router.get('/:id', verify, InvoiceController.getOneInvoice);
router.delete('/', verify, InvoiceController.deleteInvoice);

export default router;
