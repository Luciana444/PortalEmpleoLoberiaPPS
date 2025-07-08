import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

describe('POST /auth/login', () => {

  // Primero registramos un usuario para poder probar el login
  const usuarioLogin = {
    nombre: 'Usuario Login',
    email: `testlogin${Date.now()}@mail.com`,
    contrasena: 'test1234',
    tipo_usuario: 'ciudadano'
  };

  beforeAll(async () => {
    await request(app)
      .post('/auth/register')
      .send(usuarioLogin);
  });

  // Caso exitoso
  it('Debe iniciar sesión correctamente con credenciales válidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: usuarioLogin.email,
        contrasena: usuarioLogin.contrasena
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.resultado).toHaveProperty('token'); // ajustado según el body real
  });

  // Email incorrecto
  it('Debe rechazar login con email no registrado', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'emailinexistente@test.com',
        contrasena: 'test1234'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toMatch(/usuario no existe|credenciales inválidas/i);
  });

  // Contraseña incorrecta
  it('Debe rechazar login con contraseña incorrecta', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: usuarioLogin.email,
        contrasena: 'contrasenaIncorrecta'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toMatch(/credenciales incorrectas/i);
  });

  // Campos faltantes
  it('Debe rechazar login sin email ni contraseña', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: '',
        contrasena: ''
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/email y password.*requeridos/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
