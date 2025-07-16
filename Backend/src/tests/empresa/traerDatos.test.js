import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

async function crearEmpresaYObtenerToken() {
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

describe('GET /empresa/datos', () => {
  let tokenEmpresa;

  beforeAll(async () => {
    tokenEmpresa = await crearEmpresaYObtenerToken();
  });

  it('debería devolver datos de la empresa con status 200', async () => {
    const res = await request(app)
      .get('/empresa/datos')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id_usuario');
    expect(res.body).toHaveProperty('nombre_empresa');
  });

  it('debería devolver 401 si no se envía token', async () => {
    const res = await request(app).get('/empresa/datos');
    expect(res.statusCode).toBe(401);
  });

  it('debería devolver 403 o 404 si el token es de un usuario no empresa o empresa inexistente', async () => {
    // Crear ciudadano para probar 403
    const email = `ciudadano${Date.now()}@mail.com`;

    await request(app).post('/auth/register').send({
      nombre: 'Ciudadano Test',
      email,
      contrasena: 'test1234',
      tipo_usuario: 'ciudadano'
    });

    const resLogin = await request(app).post('/auth/login').send({
      email,
      contrasena: 'test1234'
    });

    const tokenCiudadano = resLogin.body.resultado.token;

    const res = await request(app)
      .get('/empresa/datos')
      .set('Authorization', `Bearer ${tokenCiudadano}`);

    expect([403, 404]).toContain(res.statusCode);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
