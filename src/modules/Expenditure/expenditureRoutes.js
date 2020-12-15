import { Router } from 'express';
import ExpenditureController from './ExpenditureController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/assets/create', verify, ExpenditureController.createAsset);
router.post('/expenses/create', verify, ExpenditureController.createExpense);
router.get('/assets', verify, ExpenditureController.getAssets);
router.get('/expenses', verify, ExpenditureController.getExpenses);
router.delete('/assets', verify, ExpenditureController.deleteAsset);
router.delete('/expenses', verify, ExpenditureController.deleteExpense);

export default router;
