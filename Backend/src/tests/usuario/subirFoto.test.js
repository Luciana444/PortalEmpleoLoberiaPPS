

// Primero registramos un usuario e iniciamos sesión para obtener un token
import request from 'supertest';
import app from '../../../app.js';

import sql from '../../database/db.js';
import path from 'path';
import fs from 'fs';


let token;

beforeAll(async () => {
  const email = `foto${Date.now()}@mail.com`;

  // Registro
  await request(app).post('/auth/register').send({
    nombre: 'Usuario Foto',
    email,
    contrasena: 'test1234',
    tipo_usuario: 'ciudadano'
  });

  // Login
  const resLogin = await request(app).post('/auth/login').send({
    email,
    contrasena: 'test1234'
  });

  token = resLogin.body.resultado.token;
});

describe('POST /usuario/foto/perfil', () => {
  it('debe subir una foto de perfil con éxito', async () => {
    const response = await request(app)
      .post('/usuario/foto/perfil')
      .set('Authorization', `Bearer ${token}`)
      .field('tipoUsuario', 'ciudadano')
      .attach('foto', path.resolve('src/tests/files/fotoTest.jpg'));

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
//este funciona bien en la realidad, aca da error...
  it('debe rechazar la subida si no hay token', async () => {
    const response = await request(app)
      .post('/usuario/foto/perfil')
      .attach('foto', path.resolve('src/tests/files/fotoTest.jpg'));

    expect(response.statusCode).toBe(401);
    expect(response.body.error || response.text).toMatch(/no autorizado/i);
  });
// da error pero funciona bien
  it('debe rechazar si no se envía ninguna imagen', async () => {
    const response = await request(app)
      .post('/usuario/foto/perfil')
      .set('Authorization', `Bearer ${token}`)
      .field('tipoUsuario', 'ciudadano');

    expect(response.statusCode).toBe(400);
    expect(response.body.error || response.text).toMatch(/no se recibió archivo/i);
  });

  //este da error pero en la realidad funciona bien
  it('debe rechazar archivos que no sean imágenes', async () => {
    const response = await request(app)
      .post('/usuario/foto/perfil')
      .set('Authorization', `Bearer ${token}`)
      .attach('foto', path.resolve('src/tests/files/archivo.txt'))
      .field('tipoUsuario', 'ciudadano');

    expect(response.statusCode).toBe(400);
    expect(response.body.error || response.text).toMatch(/formato/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
