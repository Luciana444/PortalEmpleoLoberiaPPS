import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

let token;
let email;

beforeAll(async () => {
  email = `ciudadano${Date.now()}@mail.com`;

  // Registro del ciudadano
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

  token = resLogin.body.resultado.token;
});

describe('GET /ciudadano/traer/postulaciones', () => {
  test('Debe devolver lista de postulaciones del ciudadano', async () => {
    const res = await request(app)
      .get('/ciudadano/traer/postulaciones')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const post = res.body[0];
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('id_oferta');
      expect(post).toHaveProperty('fecha_postulacion');
      expect(post).toHaveProperty('estado');
      expect(post).toHaveProperty('mensaje');
      expect(post).toHaveProperty('cv_url');
      expect(post).toHaveProperty('leido_por_empresa');
      expect(post).toHaveProperty('puesto_requerido');
      expect(post).toHaveProperty('nombre_empresa');
    }
  });

  test('Debe devolver 401 si no se envía token', async () => {
    const res = await request(app).get('/ciudadano/traer/postulaciones');
    expect(res.statusCode).toBe(401);
  });

  // Opcional: test de error interno, si querés simular fallo
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
