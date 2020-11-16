import { Router } from 'express';
import StaffController from './StaffController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/create', StaffController.createStaff);
router.post('/login', StaffController.loginStaff);
router.post('/forgot-password', StaffController.forgotPassword);
router.post('/change-password', verify, StaffController.changePassword);
router.put('/', verify, StaffController.updateStaffProfile);
router.get('/sub', verify, StaffController.getStaffProfile);
router.get('/', verify, StaffController.getStaffs);
router.get('/:id', verify, StaffController.getOneStaff);

export default router;
