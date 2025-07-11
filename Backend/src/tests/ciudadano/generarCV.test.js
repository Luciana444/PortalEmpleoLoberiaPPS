import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

// Función para crear un ciudadano y obtener su token
async function crearCiudadanoYObtenerToken() {
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

  return resLogin.body.resultado.token;
}

describe('GET /ciudadano/generar_cv', () => {
  let tokenCiudadano;

  beforeAll(async () => {
    tokenCiudadano = await crearCiudadanoYObtenerToken();
  });

  it('debe generar y devolver el PDF del CV para un ciudadano autenticado', async () => {
    const res = await request(app)
      .get('/ciudadano/generar_cv')
      .set('Authorization', `Bearer ${tokenCiudadano}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/pdf/);
    expect(res.body).toBeDefined();
  });

  it('debe rechazar la petición si no se envía token', async () => {
    const res = await request(app).get('/ciudadano/generar_cv');

    expect(res.statusCode).toBe(401);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/token/i);
  });

  it('debe rechazar si el usuario no es ciudadano', async () => {
    // Creamos un usuario que NO sea ciudadano (ejemplo: empresa)
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

    const tokenEmpresa = resLogin.body.resultado.token;

    const res = await request(app)
      .get('/ciudadano/generar_cv')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/no autorizado|solo ciudadanos/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
