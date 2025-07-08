import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyEmpresa } from '../middlewares/onlyEmpresa.js';
import { actualizarPerfilEmpresa, obtenerDatosEmpresa } from '../controllers/empleadorController.js';

export const empleadorRoutes = express.Router();


empleadorRoutes.patch('/actualizar/perfil',authMiddleware,onlyEmpresa,actualizarPerfilEmpresa);

empleadorRoutes.get('/datos',authMiddleware,onlyEmpresa,obtenerDatosEmpresa);


export default empleadorRoutes;