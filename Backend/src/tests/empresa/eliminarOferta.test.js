import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

// Función auxiliar para crear empresa y obtener token
async function crearEmpresaYObtenerToken() {
  const email = `empresa${Date.now()}@mail.com`;

  await request(app).post('/auth/register').send({
    nombre: 'Empresa Eliminadora',
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

// Función auxiliar para crear una oferta
async function crearOferta(token) {
  const res = await request(app)
    .post('/empresa/ofertas')
    .set('Authorization', `Bearer ${token}`)
    .send({
      puesto_requerido: "QA Tester",
      descripcion: "Prueba eliminación de oferta",
      nivel_educativo_requerido: "Secundario",
      lugar_trabajo: "Remoto",
      modalidad: "Freelance"
    });

  return res.body.id || res.body.oferta?.id || res.body.resultado?.id; // Ajuste según respuesta real
}

describe('DELETE /empresa/eliminar/oferta/:id', () => {
  let tokenEmpresa, ofertaId;

  beforeAll(async () => {
    tokenEmpresa = await crearEmpresaYObtenerToken();
    ofertaId = await crearOferta(tokenEmpresa);
  });

  it('debería eliminar la oferta y devolver status 200', async () => {
    const res = await request(app)
      .delete(`/empresa/eliminar/oferta/${ofertaId}`)
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message || res.body.mensaje).toMatch(/eliminada/i);
  });

  it('debería devolver 404 si la oferta no existe', async () => {
    const res = await request(app)
      .delete(`/empresa/eliminar/oferta/00000000-0000-0000-0000-000000000000`)
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error || res.body.mensaje).toMatch(/no encontrada/i);
  });

  it('debería devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .delete(`/empresa/eliminar/oferta/${ofertaId}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.error || res.body.mensaje).toMatch(/token/i);
  });

  it('debería devolver 403 si la oferta no pertenece a la empresa', async () => {
    // Creamos una empresa distinta
    const otroToken = await crearEmpresaYObtenerToken();

    // Volvemos a crear una oferta con la empresa original
    const nuevaOfertaId = await crearOferta(tokenEmpresa);

    // Intentamos eliminarla con otra empresa
    const res = await request(app)
      .delete(`/empresa/eliminar/oferta/${nuevaOfertaId}`)
      .set('Authorization', `Bearer ${otroToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.error || res.body.mensaje).toMatch(/permiso|autorizado|solo/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
