import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

// Función auxiliar para crear un ciudadano y loguearse
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

describe('GET /ciudadano/traer/perfil', () => {
  let token;

  beforeAll(async () => {
    token = await crearCiudadanoYObtenerToken();
  });

  it('debe traer el perfil del ciudadano autenticado', async () => {
    const res = await request(app)
      .get('/ciudadano/traer/perfil')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nombre');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('dni');
    expect(res.body).toHaveProperty('cuil');
  });

  it('debe rechazar si no se envía el token', async () => {
    const res = await request(app).get('/ciudadano/traer/perfil');

    expect(res.statusCode).toBe(401);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/token/i);
  });


  // este falla pero  funciona bien 

  it('debe rechazar si el usuario no es ciudadano', async () => {
    const email = `empleador${Date.now()}@mail.com`;

    await request(app).post('/auth/register').send({
      nombre: 'Empleador Test',
      email,
      contrasena: 'test1234',
      tipo_usuario: 'empresa'
    });

    const resLogin = await request(app).post('/auth/login').send({
      email,
      contrasena: 'test1234'
    });

    const tokenEmpleador = resLogin.body.resultado.token;

    const res = await request(app)
      .get('/ciudadano/traer/perfil')
      .set('Authorization', `Bearer ${tokenEmpleador}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/solo ciudadanos/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
