import express from 'express';
import { iniciarSesion } from '../controllers/authController.js';
import{registrarse} from '../controllers/authController.js';
import{enviarTokenRecuperacion} from '../controllers/authController.js';
export const authRoutes = express.Router();

authRoutes.post('/register', registrarse)
authRoutes.post('/recover/password', enviarTokenRecuperacion);
authRoutes.post('/login',iniciarSesion)