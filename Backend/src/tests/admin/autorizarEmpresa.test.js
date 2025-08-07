import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';
import { crearEmpresaYObtenerToken, obtenerIdEmpresaDesdeToken } from '../helpers/empresa.js';
import { crearAdminYObtenerToken } from '../helpers/admin.js';

describe('PUT /admin/empresas/:id/autorizar', () => {
  let tokenAdmin, tokenEmpresa, idEmpresa;

  beforeAll(async () => {
    tokenAdmin = await crearAdminYObtenerToken();
    tokenEmpresa = await crearEmpresaYObtenerToken();
    idEmpresa = await obtenerIdEmpresaDesdeToken(tokenEmpresa);
  });

  it('debería aprobar una empresa con token de admin', async () => {
    const res = await request(app)
      .put(`/admin/empresas/${idEmpresa}/autorizar`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ estado_publicacion: 'aprobada' });

    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje || res.body.message).toMatch(/actualizado/i);
  });

  it('debería devolver 400 si falta el campo estado_publicacion', async () => {
    const res = await request(app)
      .put(`/admin/empresas/${idEmpresa}/autorizar`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error || res.body.mensaje).toMatch(/faltan datos/i);
  });

  it('debería devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .put(`/admin/empresas/${idEmpresa}/autorizar`)
      .send({ estado_publicacion: 'aprobada' });

    expect(res.statusCode).toBe(401);
  });

  it('debería devolver 403 si el token no es de admin', async () => {
    const res = await request(app)
      .put(`/admin/empresas/${idEmpresa}/autorizar`)
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({ estado_publicacion: 'aprobada' });

    expect(res.statusCode).toBe(403);
    const mensaje = res.body.mensaje || res.body.error || res.text || '';
    expect(mensaje).toMatch(/solo administradores/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
