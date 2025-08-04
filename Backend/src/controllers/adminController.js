import { getCanPostulacionesTotales } from "../services/adminService.js";



/**
 * Controlador para obtener la cantidad total de postulaciones.
 * Solo accesible por usuarios con rol de administrador.
 *
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} - Retorna la cantidad total de postulaciones o un mensaje de error.
 */


export const getPostulacionesTotales = async(req,res)=>{
   try {
       const postulaciones_totales = await getCanPostulacionesTotales();
       return res.status(200).json(postulaciones_totales);
  }catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al obtener postulaciones totales'});        
   }

};