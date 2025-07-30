import { getCantPostulacionesTotalesRepository } from "../repositories/adminRepository.js";

export const getCanPostulacionesTotales = async()=>{
  const postulaciones_totales = await getCantPostulacionesTotalesRepository();
  return postulaciones_totales;
};