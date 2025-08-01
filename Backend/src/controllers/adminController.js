import { getCanPostulacionesTotales,getCantOfertasTotales,obtenerOfertasLaborales,obtenerResumenUsuarios,obtenerReporteVisitas } from "../services/adminService.js";

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

export const getOfertasTotales = async(req,res)=>{
  try {
      const ofertas_totales = await getCantOfertasTotales();
      return res.status(200).json(ofertas_totales);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al obtener la cantidad de ofertas totales'})
  }

};

export const getResumenUsuarios = async (req, res) => {
  try {
    const resumen = await obtenerResumenUsuarios();
    res.status(200).json(resumen);
  } catch (error) {
    console.error('Error al obtener resumen de usuarios:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getReporteVisitas = async (req, res) => {
  try {
    const reporte = await obtenerReporteVisitas();
    res.status(200).json(reporte);
  } catch (error) {
    console.error('Error al obtener reporte de visitas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};