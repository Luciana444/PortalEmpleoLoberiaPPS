import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyAdmin } from '../middlewares/onlyAdmin.js';
import { getPostulacionesTotales,getOfertasLaborales } from '../controllers/adminController.js';


export const adminRoutes = express.Router();



adminRoutes.get('/postulaciones_totales',authMiddleware,onlyAdmin, getPostulacionesTotales);
adminRoutes.get('/ofertas/laborales',authMiddleware,onlyAdmin,getOfertasLaborales);

export default adminRoutes;