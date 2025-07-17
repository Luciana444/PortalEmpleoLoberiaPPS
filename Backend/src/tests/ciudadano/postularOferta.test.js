import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';
import path from 'path';

let tokenCiudadano;
let tokenEmpresa;
let idOferta;

beforeAll(async () => {
  // Crear empresa
  const emailEmpresa = `empresa${Date.now()}@mail.com`;
  await request(app).post('/auth/register').send({
    nombre: 'Empresa Test',
    email: emailEmpresa,
    contrasena: 'test1234',
    tipo_usuario: 'empresa',
  });

  const resEmpresa = await request(app).post('/auth/login').send({
    email: emailEmpresa,
    contrasena: 'test1234',
  });
  tokenEmpresa = resEmpresa.body.resultado.token;

  // Crear oferta laboral
  const resOferta = await request(app)
    .post('/empresa/ofertas/crear')
    .set('Authorization', `Bearer ${tokenEmpresa}`)
    .send({
      puesto_requerido: 'Desarrollador Node.js',
      descripcion: 'Buscamos un dev backend',
      modalidad: 'Tiempo completo',
      lugar_trabajo: 'Remoto',
      nivel_educativo_requerido: 'Universitario completo',
      experiencia_requerida: '2 años',
    });

  idOferta = resOferta.body.id || resOferta.body.resultado?.id;

  // Crear ciudadano
  const emailCiudadano = `ciudadano${Date.now()}@mail.com`;
  await request(app).post('/auth/register').send({
    nombre: 'Ciudadano Test',
    email: emailCiudadano,
    contrasena: 'test1234',
    tipo_usuario: 'ciudadano',
  });

  const resCiudadano = await request(app).post('/auth/login').send({
    email: emailCiudadano,
    contrasena: 'test1234',
  });

  tokenCiudadano = resCiudadano.body.resultado.token;
});

describe('POST /ciudadano/ofertas/:id/postular', () => {
  test('Debe postularse correctamente a una oferta existente', async () => {
    const cvPath = path.resolve('src/tests/files/cvEjemplo.pdf'); 
    const res = await request(app)
      .post(`/ciudadano/ofertas/${idOferta}/postular`)
      .set('Authorization', `Bearer ${tokenCiudadano}`)
      .field('mensaje', 'Estoy interesado en esta oferta.')
      .attach('cv', cvPath);

    console.log('Respuesta:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/exitosa|éxito/i);
  });

  test('Debe devolver 400 si ya está postulado', async () => {
    const cvPath = path.resolve('src/tests/files/cvEjemplo.pdf');

    const res = await request(app)
      .post(`/ciudadano/ofertas/${idOferta}/postular`)
      .set('Authorization', `Bearer ${tokenCiudadano}`)
      .field('mensaje', 'Segundo intento')
      .attach('cv', cvPath);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/ya esta postulado/i);
  });

  test('Debe devolver 401 si no se envía token', async () => {
    const cvPath = path.resolve('src/tests/files/cvEjemplo.pdf');

    const res = await request(app)
      .post(`/ciudadano/ofertas/${idOferta}/postular`)
      .field('mensaje', 'Sin token')
      .attach('cv', cvPath);

    expect(res.statusCode).toBe(401);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
