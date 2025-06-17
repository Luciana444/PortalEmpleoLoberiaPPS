import express from 'express';
import { ciudadanoRoutes } from './ciudadanoRoutes.js';
import {empleadorRoutes} from './empleadorRoutes.js';
export const router = express.Router();
router.use('/ciudadano',ciudadanoRoutes);
router.use('/empleador',empleadorRoutes);