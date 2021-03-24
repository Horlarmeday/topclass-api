import { Router } from 'express';
import UtilityController from './UtilityController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/label/create', verify, UtilityController.createLabel);
router.post('/unit/create', verify, UtilityController.createUnit);
router.post('/settings/create', verify, UtilityController.createSetting);
router.post('/default/create', verify, UtilityController.createDefaultItem);
router.post('/bank/create', verify, UtilityController.createBank);
router.put('/settings', verify, UtilityController.updateSetting);
router.put('/bank', verify, UtilityController.updateBank);
router.delete('/label', verify, UtilityController.deleteLabel);
router.delete('/unit', verify, UtilityController.deleteUnit);
router.delete('/default', verify, UtilityController.deleteDefaultItem);
router.get('/label', verify, UtilityController.getLabels);
router.get('/unit', verify, UtilityController.getUnits);
router.get('/settings', verify, UtilityController.getSettings);
router.get('/default', verify, UtilityController.getDefaultItems);
router.get('/bank', verify, UtilityController.getBanks);

export default router;
