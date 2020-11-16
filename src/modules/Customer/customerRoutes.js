import { Router } from 'express';
import CustomerController from './CustomerController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/create', verify, CustomerController.createCustomer);
router.put('/', verify, CustomerController.updateCustomerProfile);
router.get('/', verify, CustomerController.getCustomers);
router.get('/:id', verify, CustomerController.getOneCustomer);

export default router;
