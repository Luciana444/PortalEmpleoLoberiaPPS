import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { onlyAdmin } from '../middlewares/onlyAdmin';


export const adminRoutes = express.Router();



adminRoutes.get('/postulaciones_totales',authMiddleware,onlyAdmin, getPostulacionesTotales);


export default adminRoutes;