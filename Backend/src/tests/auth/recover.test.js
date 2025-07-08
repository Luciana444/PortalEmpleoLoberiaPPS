import request from 'supertest';
import app from '../../app.js';

import sql from '../../database/db.js';


// Para evitar que tests queden colgados, siempre termina con afterAll si cierras conexiones


describe('POST /auth/recover/password', () => {
  it('debe enviar token de recuperación si el email existe', async () => {
    const emailExistente = 'analiaveronicadra@gmail.com'; // Cambia por un email válido de prueba

    const response = await request(app)
      .post('/auth/recover/password')
      .send({ email: emailExistente });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toMatch(/link para recuperar la contraseña/i);
  });

  it('debe responder 404 si el email no existe', async () => {
    const emailNoExistente = `noexiste${Date.now()}@mail.com`;

    const response = await request(app)
      .post('/auth/recover/password')
      .send({ email: emailNoExistente });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/no está registrado/i);
  });

  it('debe rechazar la petición si no se envía email', async () => {
    const response = await request(app)
      .post('/auth/recover/password')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/email.*requerido/i);
  });
});


afterAll(async () => {
  await sql.end({ timeout: 5 });
});

