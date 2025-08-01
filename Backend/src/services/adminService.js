import { getCantOfertasTotalesRepository, getCantPostulacionesTotalesRepository,listarOfertasLaborales,listarResumenUsuarios,listarReporteVisitas  } from "../repositories/adminRepository.js";

export const getCanPostulacionesTotales = async()=>{
  const postulaciones_totales = await getCantPostulacionesTotalesRepository();
  return postulaciones_totales;
};

export const obtenerOfertasLaborales = async (estadoPublicacion) => {
  return await listarOfertasLaborales(estadoPublicacion);
};

export const getCantOfertasTotales = async()=>{
  const ofertas_totales = await getCantOfertasTotalesRepository();
  return ofertas_totales;
};


export const obtenerResumenUsuarios = async () => {
  return await listarResumenUsuarios();
};

export const obtenerReporteVisitas = async () => {
  return await listarReporteVisitas();
};