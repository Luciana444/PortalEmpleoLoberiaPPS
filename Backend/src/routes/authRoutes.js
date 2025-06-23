import express from 'express';
import { cerrarSesion, iniciarSesion } from '../controllers/authController.js';
import{registrarse} from '../controllers/authController.js';
import{enviarTokenRecuperacion} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
export const authRoutes = express.Router();

//endpoint para registrar un usuario    
authRoutes.post('/register', registrarse)
//endpoint para recuperar la contraseña
authRoutes.post('/recover/password', enviarTokenRecuperacion);
authRoutes.post('/login',iniciarSesion);
authRoutes.post('/logout',authMiddleware,cerrarSesion);