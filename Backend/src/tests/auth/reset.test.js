import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';


describe('POST /auth/reset/password', () => {
  // 1. Caso exitoso
  it('debe resetear la contraseña con un token válido', async () => {
    const tokenValido = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NjE2OWFhLTg0ZDUtNGE5MC05ZTg3LWE1ZjA4N2FjNGE1ZiIsImlhdCI6MTc1MjA5OTUyMSwiZXhwIjoxNzUyMTAzMTIxfQ.UNbCbi8ybpckNzJzFiWF4KvNFFsayb0-vpjDbPLTF-0'; // 🔁 Reemplazar por un token real para test
    const nuevaContrasena = '77777777';

    const response = await request(app)
      .post('/auth/reset/password')
      .send({
        token: tokenValido,
        nuevaContrasena
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/contraseña.*actualizada/i);
  });

  // 2. Token inválido
  it('debe rechazar si el token es inválido', async () => {
    const response = await request(app)
      .post('/auth/reset/password')
      .send({
        token: 'token_falso_invalido',
        nuevaContrasena: 'otraPassword456'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/token.*inválido/i);
  });

  // 3. Faltan campos
  it('debe rechazar si faltan campos obligatorios', async () => {
    const response = await request(app)
      .post('/auth/reset/password')
      .send({
        token: '',
        nuevaContrasena: ''
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/token.*requeridos/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 }); // Cierra la conexión con un timeout opcional
});

