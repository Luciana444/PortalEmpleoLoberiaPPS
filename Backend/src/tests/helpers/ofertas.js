import request from 'supertest';
import app from '../../../app.js';

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

  return res.body.id_oferta; // 👈 directamente desde la respuesta
}
