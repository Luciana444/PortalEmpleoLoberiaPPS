import express from 'express';
import { iniciarSesion } from '../controllers/authController.js';
import{registrarse} from '../controllers/authController.js';
export const authRoutes = express.Router();

authRoutes.post('/register', registrarse)
authRoutes.post('/login',iniciarSesion)