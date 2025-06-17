import express from 'express';
import { getAllUsuarios } from '../controllers/usuarioController.js';
export const usuarioRoutes = express.Router();
usuarioRoutes.get('/',getAllUsuarios);
