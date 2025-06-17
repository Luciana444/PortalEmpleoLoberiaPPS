import express from 'express';
import { iniciarSesion } from '../controllers/authController.js';
export const authRoutes = express.Router();


authRoutes.post('/login',iniciarSesion)