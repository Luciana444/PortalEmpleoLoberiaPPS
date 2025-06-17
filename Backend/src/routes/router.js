import express from 'express';
import { usuarioRoutes } from './usuarioRoutes.js';
import { authRoutes } from './authRoutes.js';
export const router = express.Router();
router.use('/usuario',usuarioRoutes);
router.use('/auth',authRoutes)
