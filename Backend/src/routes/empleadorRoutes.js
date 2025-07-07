import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyEmpresa } from '../middlewares/onlyEmpresa.js';
import { actualizarPerfilEmpresa, obtenerDatosEmpresa } from '../controllers/empleadorController.js';

export const empleadoRoutes = express.Router();


empleadoRoutes.patch('/actualizar/perfil',authMiddleware,onlyEmpresa,actualizarPerfilEmpresa);

empleadoRoutes.get('/datos',authMiddleware,onlyEmpresa,obtenerDatosEmpresa);


export default empleadoRoutes;