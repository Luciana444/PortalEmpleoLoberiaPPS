import { getCanPostulacionesTotales,obtenerOfertasLaborales } from "../services/adminService.js";

export const getPostulacionesTotales = async(req,res)=>{
   try {
       const postulaciones_totales = await getCanPostulacionesTotales();
       return res.status(200).json(postulaciones_totales);
  }catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al obtener postulaciones totales'});        
   }

};

export const getOfertasLaborales = async (req, res) => {
  try {
    const { estado_publicacion } = req.query;

    const ofertas = await obtenerOfertasLaborales(estado_publicacion);
    res.status(200).json(ofertas);
  } catch (error) {
    console.error('Error al obtener las ofertas laborales:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};