import { getCanPostulacionesTotales,getCantOfertasTotales,obtenerOfertasLaborales,obtenerResumenUsuarios,obtenerReporteVisitas, generarReporteMetricasService, getCiudadanos, autorizarOfertaLaboral, getListaEmpresasService, autorizarEmpresaService } from "../services/adminService.js";




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

export const generarReporteMetricas = async(req,res)=>{
  try {
      await generarReporteMetricasService(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al generar el reporte de metricas'})
  }
};


export const getListaCiudadanos = async(req,res)=>{
  try {
      const lista_ciudadanos = await getCiudadanos();
      return res.status(200).json(lista_ciudadanos);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al obtener la lista de los ciudadanos'});
  }
};

export const autorizarOferta = async(req,res)=>{
  try {
      const email = req.usuario.email;
      const id_oferta = req.params.id;
      const {estado_publicacion} = req.body;

      if(!estado_publicacion){
        return res.status(401).json({message:'Faltan datos en el body'})
      };

      
      await autorizarOfertaLaboral(email,id_oferta,estado_publicacion);

      return res.status(200).json({message:'Estado de publicacion de la oferta actualizado'});

  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error en la autorizacion de la oferta'})
  }
};

export const getListaEmpresas = async(req,res)=>{
  try {
      const empresas = await getListaEmpresasService();
      return res.status(200).json(empresas);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error al obtener la lista de empresas'})
  }
};

export const autorizarEmpresa = async(req,res)=>{
  try {
      const email = req.usuario.email;
      const id_empresa = req.params.id;
      const {estado_publicacion} = req.body;
      
      if(!estado_publicacion){
        return res.status(401).json({message:'Faltan datos en el body'})
      };

      await autorizarEmpresaService(email,id_empresa,estado_publicacion);

      return res.status(200).json({message:'Estado de aprobacion de la empresa actualizado'});

  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Error en la autorizacion de una empresa'})
  }
};