


import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';
import { jest } from '@jest/globals';

// Helpers para crear empresa y token
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

// Helper para crear ciudadano y obtener token
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

// Helper para crear oferta
async function crearOferta(token) {
  return await request(app)
    .post('/empresa/ofertas')
    .set('Authorization', `Bearer ${token}`)
    .send({
      puesto_requerido: "QA Tester",
      descripcion: "Prueba postulación",
      nivel_educativo_requerido: "Secundario",
      lugar_trabajo: "Remoto",
      modalidad: "Freelance"
    });
}

// Helper para obtener último ID de oferta de empresa
async function obtenerUltimaOfertaDeEmpresa(idEmpresa) {
  const resultado = await sql`
    SELECT id FROM ofertas_laborales
    WHERE id_empresa = ${idEmpresa}
    ORDER BY id DESC
    LIMIT 1
  `;
  return resultado[0]?.id;
}

// Decodificar JWT sin verificar (solo para tests)
function decodificarToken(token) {
  const payload = token.split('.')[1];
  return JSON.parse(Buffer.from(payload, 'base64').toString());
}

describe('POST /ciudadano/ofertas/:id/postular', () => {
  jest.setTimeout(15000); // aumenta el tiempo de espera global a 15 segundos

  let tokenEmpresa, tokenCiudadano, ofertaId;

  beforeAll(async () => {
    tokenEmpresa = await crearEmpresaYObtenerToken();
    tokenCiudadano = await crearCiudadanoYObtenerToken();

    // Crear oferta con empresa
    await crearOferta(tokenEmpresa);

    // Obtener ID de la oferta creada
    const idEmpresa = decodificarToken(tokenEmpresa).id;
    ofertaId = await obtenerUltimaOfertaDeEmpresa(idEmpresa);

    if (!ofertaId) {
      throw new Error('No se pudo obtener el ID de la oferta');
    }
  });

  it('debe postularse correctamente a una oferta existente', async () => {
    const res = await request(app)
      .post(`/ciudadano/ofertas/${ofertaId}/postular`)
      .set('Authorization', `Bearer ${tokenCiudadano}`)
      .field('mensaje', 'Estoy interesado en esta oferta')
      .attach('cv', 'src/tests/files/cvEjemplo.pdf');

    expect(res.statusCode).toBe(200);
    expect(res.body.message || res.body.mensaje).toMatch(/exitosa|éxito/i);
  });

  it('debe devolver 400 si ya está postulado', async () => {
    // Postulamos de nuevo a la misma oferta con el mismo tokenCiudadano
    const res = await request(app)
      .post(`/ciudadano/ofertas/${ofertaId}/postular`)
      .set('Authorization', `Bearer ${tokenCiudadano}`)
      .field('mensaje', 'Estoy interesado en esta oferta')
      .attach('cv', 'src/tests/files/cvEjemplo.pdf');

    expect(res.statusCode).toBe(400);
    expect(res.body.message || res.body.mensaje).toMatch(/ya esta postulado/i);
  });

  it('debe devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .post(`/ciudadano/ofertas/${ofertaId}/postular`)
      .field('mensaje', 'Estoy interesado en esta oferta')
      .attach('cv', 'src/tests/files/cvEjemplo.pdf');

    expect(res.statusCode).toBe(401);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/token/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
