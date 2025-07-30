import { getCanPostulacionesTotales } from "../services/adminService.js";

export const getPostulacionesTotales = async(req,res)=>{
   try {
       const postulaciones_totales = await getCanPostulacionesTotales();
       return res.status(200).json(postulaciones_totales);
  }catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al obtener postulaciones totales'});        
   }

};