import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';



describe('POST /auth/reset/password', () => {
  it('debe resetear la contraseña correctamente con token válido', async () => {
    // Aquí deberías usar un token válido para test o simular el service para devolver éxito

    // Para propósitos de test básico, asumo que usás un token válido
    const tokenValido = 'tokenvalidoejemplo';
    const nuevaContrasena = 'nuevacontra123';

    const response = await request(app)
      .post('/auth/reset/password')
      .send({ token: tokenValido, nuevaContrasena });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toMatch(/contraseña actualizada correctamente/i);
  });

  it('debe rechazar reset sin token o nueva contraseña', async () => {
    const response = await request(app)
      .post('/auth/reset/password')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/token.*nueva contraseña/i);
  });

  it('debe rechazar reset con token inválido o expirado', async () => {
    const tokenInvalido = 'tokeninvalidoejemplo';
    const nuevaContrasena = 'nuevacontra123';

    const response = await request(app)
      .post('/auth/reset/password')
      .send({ token: tokenInvalido, nuevaContrasena });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/token inválido|expirado/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 }); // Cierra la conexión con un timeout opcional
});

