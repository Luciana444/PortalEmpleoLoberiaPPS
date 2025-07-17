import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

let token;
let email;

beforeAll(async () => {
  email = `ciudadano${Date.now()}@mail.com`;

  await request(app).post('/auth/register').send({
    nombre: 'Ciudadano Test',
    email,
    contrasena: 'test1234',
    tipo_usuario: 'ciudadano',
  });

  const resLogin = await request(app).post('/auth/login').send({
    email,
    contrasena: 'test1234',
  });

  token = resLogin.body.resultado.token;
});

describe('GET /ciudadano/filtrar/ofertas', () => {
  test('Debe devolver lista de ofertas filtradas correctamente', async () => {
    const filtros = {
      modalidad: 'Tiempo completo',
      lugar_trabajo: 'Remoto',
      descripcion: 'desarrollador',
      puesto_requerido: 'programador',
    };

    const res = await request(app)
      .get('/ciudadano/filtrar/ofertas')
      .set('Authorization', `Bearer ${token}`)
      .query(filtros);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const oferta = res.body[0];
      expect(oferta).toHaveProperty('id');
      expect(oferta).toHaveProperty('puesto_requerido');
      expect(oferta).toHaveProperty('descripcion');
      expect(oferta).toHaveProperty('modalidad');
      expect(oferta).toHaveProperty('lugar_trabajo');
      expect(oferta).toHaveProperty('fecha_publicacion');
    }
  });

  test('Debe devolver 401 si no envía token', async () => {
    const res = await request(app).get('/ciudadano/filtrar/ofertas');
    expect(res.statusCode).toBe(401);
  });

  // Opcional: test de error interno simulando error (requiere importar y mockear)
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
