import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';





async function crearEmpresaYObtenerToken(nombre = 'Empresa Postulante') {
  const email = `empresa${Date.now()}@mail.com`;
  await request(app).post('/auth/register').send({
    nombre,
    email,
    contrasena: 'test1234',
    tipo_usuario: 'empresa'
  });
  const res = await request(app).post('/auth/login').send({ email, contrasena: 'test1234' });
  return res.body.resultado.token;
}

async function crearCiudadanoYPostular(idOferta) {
  const email = `ciudadano${Date.now()}@mail.com`;
  await request(app).post('/auth/register').send({
    nombre: 'Carlos',
    apellido: 'Postulante',
    email,
    contrasena: 'test1234',
    tipo_usuario: 'ciudadano'
  });

  const resLogin = await request(app).post('/auth/login').send({ email, contrasena: 'test1234' });
  const token = resLogin.body.resultado.token;

  await request(app)
    .post(`/ciudadano/postular/${idOferta}`)
    .set('Authorization', `Bearer ${token}`);
}

async function crearOfertaYObtenerId(token) {
  await request(app)
    .post('/empresa/ofertas')
    .set('Authorization', `Bearer ${token}`)
    .send({
      puesto_requerido: "Dev",
      descripcion: "Oferta para test de postulaciones",
      nivel_educativo_requerido: "Terciario",
      lugar_trabajo: "Presencial",
      modalidad: "Tiempo completo"
    });

  const { id } = await sql`
    SELECT id FROM ofertas_laborales ORDER BY id DESC LIMIT 1
  `;
  return id;
}

function decodificarToken(token) {
  const payload = token.split('.')[1];
  return JSON.parse(Buffer.from(payload, 'base64').toString());
}

describe('GET /empresa/ofertas/:id/postulaciones', () => {
  let tokenEmpresa, idOferta;

  beforeAll(async () => {

console.log('ID DE OFERTA ANTES DE QUERY:', idOferta);

if (idOferta) {
  const postulaciones = await sql`
    SELECT * FROM postulaciones WHERE id_oferta = ${idOferta}
  `;
  console.log('POSTULACIONES:', postulaciones);
} else {
  console.warn('⚠️ La variable idOferta aún está indefinida');
}


    tokenEmpresa = await crearEmpresaYObtenerToken();
    idOferta = await crearOfertaYObtenerId(tokenEmpresa);
    await crearCiudadanoYPostular(idOferta);
  });

  it('debería devolver postulaciones de una oferta', async () => {
    const res = await request(app)
      .get(`/empresa/ofertas/${idOferta}/postulaciones`)
      .set('Authorization', `Bearer ${tokenEmpresa}`);

      console.log('RESPONSE STATUS:', res.statusCode);
      console.log('RESPONSE BODY:', res.body);


    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('cv_url');
  });

  it('debería rechazar sin token', async () => {
    const res = await request(app).get(`/empresa/ofertas/${idOferta}/postulaciones`);
    expect(res.statusCode).toBe(401);
  });

  it('debería devolver 403 si usuario no es empresa', async () => {
    const email = `ciudadano${Date.now()}@mail.com`;
    await request(app).post('/auth/register').send({
      nombre: 'Ana',
      apellido: 'Ciudadana',
      email,
      contrasena: 'test1234',
      tipo_usuario: 'ciudadano'
    });

    const resLogin = await request(app).post('/auth/login').send({ email, contrasena: 'test1234' });
    const tokenCiudadano = resLogin.body.resultado.token;

    const res = await request(app)
      .get(`/empresa/ofertas/${idOferta}/postulaciones`)
      .set('Authorization', `Bearer ${tokenCiudadano}`);

    expect(res.statusCode).toBe(403);
  });

  it('debería devolver 404 si la oferta no existe', async () => {
    const res = await request(app)
      .get(`/empresa/ofertas/00000000-0000-0000-0000-000000000000/postulaciones`)
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(404);
  });

  it('debería devolver 403 si la oferta no pertenece a la empresa', async () => {
    const otroToken = await crearEmpresaYObtenerToken('Empresa Ajena');

    const res = await request(app)
      .get(`/empresa/ofertas/${idOferta}/postulaciones`)
      .set('Authorization', `Bearer ${otroToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message || res.body.mensaje).toMatch(/no pertenece/i);
  });
});




afterAll(async () => {
  await sql.end({ timeout: 5 });
});
