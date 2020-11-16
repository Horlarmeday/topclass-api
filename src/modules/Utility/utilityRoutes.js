import { Router } from 'express';
import UtilityController from './UtilityController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/label/create', verify, UtilityController.createLabel);
router.post('/unit/create', verify, UtilityController.createUnit);
router.delete('/label', verify, UtilityController.deleteLabel);
router.delete('/unit', verify, UtilityController.deleteUnit);
router.get('/label', verify, UtilityController.getLabels);
router.get('/unit', verify, UtilityController.getUnits);

export default router;
