import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

async function crearEmpresaYObtenerToken(nombre = 'Empresa Editora') {
  const email = `empresa${Date.now()}@mail.com`;

  await request(app).post('/auth/register').send({
    nombre,
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

async function crearOferta(token) {
  return await request(app)
    .post('/empresa/ofertas')
    .set('Authorization', `Bearer ${token}`)
    .send({
      puesto_requerido: "QA Tester",
      descripcion: "Oferta para editar",
      nivel_educativo_requerido: "Secundario",
      lugar_trabajo: "Remoto",
      modalidad: "Freelance"
    });
}

function decodificarToken(token) {
  const payload = token.split('.')[1];
  return JSON.parse(Buffer.from(payload, 'base64').toString());
}

async function obtenerUltimaOfertaDeEmpresa(idEmpresa) {
  const resultado = await sql`
    SELECT id FROM ofertas_laborales
    WHERE id_empresa = ${idEmpresa}
    ORDER BY id DESC
    LIMIT 1
  `;
  return resultado[0]?.id;
}

describe('PATCH /empresa/ofertas/:id', () => {
  let tokenEmpresa, ofertaId;

  beforeAll(async () => {
    tokenEmpresa = await crearEmpresaYObtenerToken();
    await crearOferta(tokenEmpresa);
    const idEmpresa = decodificarToken(tokenEmpresa).id;
    ofertaId = await obtenerUltimaOfertaDeEmpresa(idEmpresa);
  });

  it('debería editar la oferta correctamente', async () => {
    const res = await request(app)
      .patch(`/empresa/ofertas/${ofertaId}`)
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({
        puesto_requerido: "QA Senior",
        descripcion: "Edición exitosa de oferta",
        nivel_educativo_requerido: "Universitario",
        modalidad: "Tiempo completo"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message || res.body.mensaje).toMatch(/editada/i);
  });

  it('debería rechazar si no se envía token', async () => {
    const res = await request(app)
      .patch(`/empresa/ofertas/${ofertaId}`)
      .send({ puesto_requerido: "Sin token" });

    expect(res.statusCode).toBe(401);
  });

  it('debería devolver 404 si la oferta no existe', async () => {
    const res = await request(app)
      .patch(`/empresa/ofertas/00000000-0000-0000-0000-000000000000`)
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({ puesto_requerido: "Inexistente" });

    expect(res.statusCode).toBe(404);
  });

  it('debería devolver 403 si la oferta no pertenece a la empresa', async () => {
    const otroToken = await crearEmpresaYObtenerToken('Otra Empresa');

    // Creamos otra oferta con la empresa original
    await crearOferta(tokenEmpresa);
    const idEmpresa = decodificarToken(tokenEmpresa).id;
    const nuevaOfertaId = await obtenerUltimaOfertaDeEmpresa(idEmpresa);

    const res = await request(app)
      .patch(`/empresa/ofertas/${nuevaOfertaId}`)
      .set('Authorization', `Bearer ${otroToken}`)
      .send({ puesto_requerido: "Intento no autorizado" });

    expect(res.statusCode).toBe(403);
    expect(res.body.message || res.body.mensaje).toMatch(/no pertenece/i);
  });

  it('debería devolver 400 si los datos son inválidos', async () => {
    const res = await request(app)
      .patch(`/empresa/ofertas/${ofertaId}`)
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({
        puesto_requerido: "",
        modalidad: "Modo incorrecto"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errores).toBeDefined();
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
