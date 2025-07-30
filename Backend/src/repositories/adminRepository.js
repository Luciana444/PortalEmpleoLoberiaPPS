import sql from "../database/db.js";


export const getCantPostulacionesTotalesRepository = async()=>{
  const postulaciones_totales = await sql`SELECT COUNT(*) FROM postulaciones`;
  return postulaciones_totales[0];
};