import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

router.get('/', authController.getLogin);
router.post('/', authController.postLogin);

router.post('/logout', authController.logout);

export default router;