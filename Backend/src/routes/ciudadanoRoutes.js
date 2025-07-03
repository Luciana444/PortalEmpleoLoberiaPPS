import express from 'express';
import { generarPdf, subirCV } from '../controllers/ciudadanoController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js'
import {onlyCiudadano} from '../middlewares/onyCiudadano.js'
import subirCv from '../middlewares/upload.js';
import { actualizarPerfilCiudadano } from '../controllers/ciudadanoController.js';


export const ciudadanoRoutes = express.Router();


ciudadanoRoutes.put('/importar_cv',authMiddleware, onlyCiudadano, subirCv.single('cv'),subirCV);


ciudadanoRoutes.patch('/actualizar/perfil', actualizarPerfilCiudadano);


ciudadanoRoutes.get('/generar_cv',authMiddleware,generarPdf);

export default ciudadanoRoutes;