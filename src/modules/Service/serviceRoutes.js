import { Router } from 'express';
import ServiceController from './ServiceController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/create', verify, ServiceController.createService);
router.put('/', verify, ServiceController.updateService);
router.get('/', verify, ServiceController.getServices);
router.get('/:id', verify, ServiceController.getOneService);

export default router;
