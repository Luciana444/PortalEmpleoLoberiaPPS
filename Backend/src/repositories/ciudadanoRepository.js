import sql from '../database/db.js';

export const insertarUrlCv = async (id_usuario, url_cv) => {
  const resultado = await sql`
    INSERT INTO postulaciones (id_usuario, id_oferta, fecha_postulacion, mensaje, cv_url, estado) VALUES 
    (${id_usuario}, '11ab02c3-58f1-4040-a779-e68a4cb2456f', 'NOW()', 
    'Ejemplo para subir cv a una postulacion', ${url_cv}, 'pendiente')
    RETURNING *;
  `;
  return resultado[0];
};