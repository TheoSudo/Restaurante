import express from 'express';
import reservaController from '../controllers/reservaController.js';
import { isUser, isAdmin, isLoggedIn, } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', isLoggedIn, reservaController.listarReservas);

router.get('/new', isUser, reservaController.showAddForm);
router.post('/new', isUser, reservaController.addReserva);

router.post('/delete/:id', isAdmin, reservaController.deleteReserva);

export default router;
