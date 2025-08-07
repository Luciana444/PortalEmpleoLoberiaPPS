import request from 'supertest';
import app from '../../../app.js';

/**
 * Crea una oferta laboral básica y retorna su ID
 * @param {string} token - Token JWT de empresa
 * @returns {Promise<string>} - ID de la oferta creada
 */
export async function crearOferta(token) {
  const res = await request(app)
    .post('/empresa/ofertas')
    .set('Authorization', `Bearer ${token}`)
    .send({
      puesto_requerido: "QA Tester",
      descripcion: "Prueba eliminación de oferta",
      nivel_educativo_requerido: "Secundario",
      lugar_trabajo: "Remoto",
      modalidad: "Freelance"
    });

  console.log("Respuesta al crear oferta:", res.body);

  return res.body.oferta?.id; 
}
