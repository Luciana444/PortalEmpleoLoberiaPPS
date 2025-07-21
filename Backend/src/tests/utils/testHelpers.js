// src/tests/utils/testHelpers.js


import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

async function crearCiudadanoYObtenerToken() {
  const email = `ciudadano${Date.now()}@mail.com`;
  const contrasena = 'test1234';

  await request(app).post('/auth/register').send({
    nombre: 'Ciudadano Test',
    email,
    contrasena,
    tipo_usuario: 'ciudadano',
  });

  const resLogin = await request(app).post('/auth/login').send({ email, contrasena });

  return {
    token: resLogin.body.resultado.token,
    usuario: resLogin.body.resultado.payload, // viene con id, email, tipo_usuario
  };
}

async function crearEmpresa() {
  const email = `empresa${Date.now()}@mail.com`;
  const contrasena = 'test1234';

  await request(app).post('/auth/register').send({
    nombre: 'Empresa Test',
    email,
    contrasena,
    tipo_usuario: 'empresa',
  });

  const resLogin = await request(app).post('/auth/login').send({ email, contrasena });

  return {
    token: resLogin.body.resultado.token,
    usuario: resLogin.body.resultado.payload,
  };
}

export { crearCiudadanoYObtenerToken, crearEmpresa };
