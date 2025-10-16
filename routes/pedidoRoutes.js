import express from 'express';
import pedidoController from '../controllers/pedidoController.js';
import { isUser, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  if (req.session.user?.isAdmin) {
    return res.redirect('/pedidos/admin');
  } else {
    return res.redirect('/pedidos/novo');
  }
});

router.get('/novo', isUser, pedidoController.showCardapio);
router.post('/novo', isUser, pedidoController.criarPedido);

router.get('/admin', isAdmin, pedidoController.listarPedidos);
router.post('/delete/:id', isAdmin, pedidoController.deletePedido);

export default router;
