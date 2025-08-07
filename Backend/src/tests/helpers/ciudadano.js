import request from 'supertest';
import app from '../../../app.js';

export async function crearCiudadanoYObtenerToken() {
  const email = `ciudadano${Date.now()}@mail.com`;

  // Registro
  await request(app).post('/auth/register').send({
    nombre: 'Ciudadano Test',
    email,
    contrasena: 'test1234',
    tipo_usuario: 'ciudadano'
  });

  // Login
  const resLogin = await request(app).post('/auth/login').send({
    email,
    contrasena: 'test1234'
  });

  return resLogin.body.resultado.token;
}
