import express from 'express';
import { registrarCiudadano } from '../controllers/ciudadanoController.js';
export const ciudadanoRoutes = express.Router();
ciudadanoRoutes.get('/',registrarCiudadano);
