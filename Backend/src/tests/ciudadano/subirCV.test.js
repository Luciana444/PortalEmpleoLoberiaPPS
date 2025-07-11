import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';
import path from 'path';

// Función auxiliar para crear un ciudadano y obtener token
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

// Función auxiliar para crear empleador y obtener token
async function crearEmpleadorYObtenerToken() {
  const email = `empleador${Date.now()}@mail.com`;
  await request(app).post('/auth/register').send({
    nombre: 'Empleador Test',
    email,
    contrasena: 'test1234',
    tipo_usuario: 'empresa' // o 'empleador' según como tengas definido
  });

  const resLogin = await request(app).post('/auth/login').send({
    email,
    contrasena: 'test1234'
  });

  return resLogin.body.resultado.token;
}

describe('PUT /ciudadano/upload_cv', () => {
  let tokenCiudadano;
  let tokenEmpleador;

  beforeAll(async () => {
    tokenCiudadano = await crearCiudadanoYObtenerToken();
    tokenEmpleador = await crearEmpleadorYObtenerToken();
  });

  it('debe subir un CV PDF correctamente con token y usuario ciudadano', async () => {
    const res = await request(app)
      .put('/ciudadano/upload_cv')
      .set('Authorization', `Bearer ${tokenCiudadano}`)
      .attach('cv', path.resolve('./src/tests/files/cvEjemplo.pdf')); // Tenés que tener este PDF en esa ruta

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje');
    expect(res.body).toHaveProperty('url');
  });

  // falla aca pero anda en la app
  it('debe rechazar la subida si no hay token', async () => {
    const res = await request(app)
      .put('/ciudadano/upload_cv')
      .attach('cv', path.resolve('./src/tests/files/cvEjemplo.pdf'));

    expect(res.statusCode).toBe(401);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/token/i);
  });

  // falla aca pero anda en la app
  
  it('debe rechazar la subida si el usuario no es ciudadano', async () => {
    const res = await request(app)
      .put('/ciudadano/upload_cv')
      .set('Authorization', `Bearer ${tokenEmpleador}`)
      .attach('cv', path.resolve('./src/tests/files/cvEjemplo.pdf'));

    expect(res.statusCode).toBe(403);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/no autorizado|solo ciudadanos/i);
  });

  it('debe rechazar si no se envía archivo', async () => {
    const res = await request(app)
      .put('/ciudadano/upload_cv')
      .set('Authorization', `Bearer ${tokenCiudadano}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/archivo|cv/i);
  });

  it('debe rechazar si el archivo no es PDF', async () => {
    const res = await request(app)
      .put('/ciudadano/upload_cv')
      .set('Authorization', `Bearer ${tokenCiudadano}`)
      .attach('cv', path.resolve('./src/tests/files/cvNoPDF.txt')); // archivo no PDF para probar

    // El status puede variar según implementación, 400 o 500 es típico
    expect([400, 500]).toContain(res.statusCode);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/pdf|formato/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
