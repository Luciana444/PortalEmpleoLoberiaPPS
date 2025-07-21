import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';
import { jest } from '@jest/globals';

// Helpers
async function crearEmpresaYObtenerToken() {
  const email = `empresa${Date.now()}@mail.com`;
  await request(app).post('/auth/register').send({
    nombre: 'Empresa Test',
    email,
    contrasena: 'test1234',
    tipo_usuario: 'empresa'
  });

  const resLogin = await request(app).post('/auth/login').send({
    email,
    contrasena: 'test1234'
  });

  return resLogin.body.resultado.token;
}

async function crearCiudadanoYObtenerToken() {
  const email = `ciudadano${Date.now()}@mail.com`;
  await request(app).post('/auth/register').send({
    nombre: 'Ciudadano Test',
    email,
    contrasena: 'test1234',
    tipo_usuario: 'ciudadano'
  });

  const resLogin = await request(app).post('/auth/login').send({
    email,
    contrasena: 'test1234'
  });

  return resLogin.body.resultado.token;
}

async function crearOferta(token) {
  return await request(app)
    .post('/empresa/ofertas')
    .set('Authorization', `Bearer ${token}`)
    .send({
      puesto_requerido: "QA Tester",
      descripcion: "Prueba cancelación",
      nivel_educativo_requerido: "Secundario",
      lugar_trabajo: "Remoto",
      modalidad: "Freelance"
    });
}

async function obtenerUltimaOfertaDeEmpresa(idEmpresa) {
  const resultado = await sql`
    SELECT id FROM ofertas_laborales
    WHERE id_empresa = ${idEmpresa}
    ORDER BY id DESC
    LIMIT 1
  `;
  return resultado[0]?.id;
}

function decodificarToken(token) {
  const payload = token.split('.')[1];
  return JSON.parse(Buffer.from(payload, 'base64').toString());
}

describe('DELETE /ciudadano/ofertas/:id/cancelar_postulacion', () => {
  jest.setTimeout(15000);

  let tokenCiudadano, tokenEmpresa, ofertaId;

  beforeAll(async () => {
    tokenEmpresa = await crearEmpresaYObtenerToken();
    tokenCiudadano = await crearCiudadanoYObtenerToken();

    await crearOferta(tokenEmpresa);
    const idEmpresa = decodificarToken(tokenEmpresa).id;
    ofertaId = await obtenerUltimaOfertaDeEmpresa(idEmpresa);

    // Postular al ciudadano antes de cancelar
    await request(app)
      .post(`/ciudadano/ofertas/${ofertaId}/postular`)
      .set('Authorization', `Bearer ${tokenCiudadano}`)
      .field('mensaje', 'Estoy interesado en esta oferta')
      .attach('cv', 'src/tests/files/cvEjemplo.pdf');
  });

  it('debe cancelar una postulación correctamente', async () => {
    const res = await request(app)
      .delete(`/ciudadano/ofertas/${ofertaId}/cancelar_postulacion`)
      .set('Authorization', `Bearer ${tokenCiudadano}`);

    expect(res.statusCode).toBe(200);
   expect(res.body.message || res.body.mensaje).toMatch(/cancelo la postulacion/i);

  });

  it('debe devolver error si intenta cancelar sin estar postulado', async () => {
    const res = await request(app)
      .delete(`/ciudadano/ofertas/${ofertaId}/cancelar_postulacion`)
      .set('Authorization', `Bearer ${tokenCiudadano}`);

   expect(res.statusCode).toBe(404);

      expect(res.body.message || res.body.mensaje).toMatch(/no.*postulado/i);
  });

  it('debe devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .delete(`/ciudadano/ofertas/${ofertaId}/cancelar_postulacion`);

    expect(res.statusCode).toBe(401);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/token/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
