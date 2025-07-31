import { getCantPostulacionesTotalesRepository,listarOfertasLaborales } from "../repositories/adminRepository.js";

export const getCanPostulacionesTotales = async()=>{
  const postulaciones_totales = await getCantPostulacionesTotalesRepository();
  return postulaciones_totales;
};

export const obtenerOfertasLaborales = async () => {
  return await listarOfertasLaborales();
};