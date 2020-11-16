import { Router } from 'express';
import ProductController from './ProductController';
import verify from '../../middleware/verify';

const router = Router();
router.post('/create', verify, ProductController.createProduct);
router.put('/', verify, ProductController.updateProduct);
router.get('/', verify, ProductController.getProducts);
router.get('/:id', verify, ProductController.getOneProduct);

export default router;
