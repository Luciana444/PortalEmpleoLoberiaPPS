import express from 'express';
import { getAllPersonas } from '../controllers/personaController.js';
export const personaRoutes = express.Router();

personaRoutes.get('/',getAllPersonas);
