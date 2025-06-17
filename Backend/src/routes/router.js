import express from 'express';
import { personaRoutes } from './personaRoutes.js';
import { authRoutes } from './authRoutes.js';


export const router = express.Router();
router.use('/persona',personaRoutes);
router.use('/auth',authRoutes)