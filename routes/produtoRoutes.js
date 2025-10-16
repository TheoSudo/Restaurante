import express from 'express';
import produtoController from '../controllers/produtoController.js';
import { isAdmin, isUser, isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', produtoController.listAllProducts);
router.get('/new', isAdmin, produtoController.showAddForm);
router.post('/new', isAdmin, produtoController.addNewProduct);
router.get('/edit/:id', isAdmin, produtoController.showEditForm);
router.post('/edit/:id', isAdmin, produtoController.updateProduct);
router.post('/delete/:id', isAdmin, produtoController.deleteProduct);

export default router;