import request from 'supertest';
import app from '../../../app.js';

export async function crearAdminYObtenerToken() {
  const email = `admin${Date.now()}@mail.com`;

  // Registro
  await request(app).post('/auth/register').send({
    nombre: 'Admin Test',
    email,
    contrasena: 'test1234',
    tipo_usuario: 'admin'
  });

  // Login
  const resLogin = await request(app).post('/auth/login').send({
    email,
    contrasena: 'test1234'
  });

  return resLogin.body.resultado.token;
}
