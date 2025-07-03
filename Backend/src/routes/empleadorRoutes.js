import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyEmpresa } from '../middlewares/onlyEmpresa.js';
import { actualizarPerfilEmpresa } from '../controllers/empleadorController.js';

export const empleadoRoutes = express.Router();


empleadoRoutes.patch('/actualizar/perfil',authMiddleware,onlyEmpresa,actualizarPerfilEmpresa);



export default empleadoRoutes;