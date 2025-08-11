import request from 'supertest';
import app from '../../../app.js';

/**
 * Registra un usuario con tipo "empresa", hace login y retorna el token.
 */
export async function crearEmpresaYObtenerToken() {
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

// Función para obtener ID de la empresa desde el token
export async function obtenerIdEmpresaDesdeToken(token) {
  const res = await request(app)
    .get('/empresa/datos')
    .set('Authorization', `Bearer ${token}`);

  return res.body.id_usuario; // 👈 este es el campo que estás esperando usar
}