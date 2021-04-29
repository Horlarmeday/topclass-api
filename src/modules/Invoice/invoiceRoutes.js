import { Router } from 'express';
import InvoiceController from './InvoiceController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/create', verify, InvoiceController.createInvoice);
router.post('/waybill/create', verify, InvoiceController.createWaybill);
router.post('/items', verify, InvoiceController.getInvoiceItems);
router.post('/getById', verify, InvoiceController.getOneInvoice);
router.put('/approve', verify, InvoiceController.approveInvoice);
router.put('/decline', verify, InvoiceController.declineInvoice);
router.put('/stepdown', verify, InvoiceController.stepDownInvoice);
router.put('/waybill', verify, InvoiceController.updateWaybill);
router.put('/dispense', verify, InvoiceController.dispenseItem);
router.put('/:id', verify, InvoiceController.updateInvoice);
router.get('/', verify, InvoiceController.getInvoices);
router.get('/staff-invoices', verify, InvoiceController.getInvoicesCreatedByStaff);
router.get('/waybill', verify, InvoiceController.getWaybills);
router.get('/waybill/:id', verify, InvoiceController.getOneWaybill);
router.get('/:id', verify, InvoiceController.getInvoiceParams);
router.delete('/', verify, InvoiceController.deleteInvoice);
router.delete('/invoice-item', verify, InvoiceController.deleteInvoiceItem);

export default router;
