import express from 'express';
import faleConoscoController from '../controllers/faleConoscoController.js';
import { isAdmin, isUser } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', faleConoscoController.listarMensagens);

router.get('/new', isUser, faleConoscoController.showAddForm);
router.post('/new', isUser, faleConoscoController.addMensagem);

router.get('/edit/:id', isUser, faleConoscoController.showEditForm);
router.post('/edit/:id', isUser, faleConoscoController.updateMensagem);
router.post('/delete/:id', isAdmin, faleConoscoController.deleteMensagem);

export default router;
