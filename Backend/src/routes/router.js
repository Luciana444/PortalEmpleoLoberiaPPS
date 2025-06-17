import express from 'express';
import { personaRoutes } from './personaRoutes.js';
export const router = express.Router();
router.use('/persona',personaRoutes);
