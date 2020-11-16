import { Router } from 'express';
import InvoiceController from './InvoiceController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/create', verify, InvoiceController.createInvoice);
router.put('/', verify, InvoiceController.updateInvoice);
router.get('/', verify, InvoiceController.getInvoices);
router.get('/:id', verify, InvoiceController.getOneInvoice);
router.delete('/', verify, InvoiceController.deleteInvoice);

export default router;
