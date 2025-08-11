import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';
import { crearEmpresaYObtenerToken, obtenerIdEmpresaDesdeToken } from '../helpers/empresa.js';
import { crearAdminYObtenerToken } from '../helpers/admin.js';

describe('ADMIN - Autorización de empresas y ofertas', () => {
  let tokenAdmin, tokenEmpresa, idEmpresa, idOferta;

  beforeAll(async () => {
    tokenAdmin = await crearAdminYObtenerToken();
    tokenEmpresa = await crearEmpresaYObtenerToken();
    idEmpresa = await obtenerIdEmpresaDesdeToken(tokenEmpresa);

    // Autorizar la empresa antes de crear la oferta
    await request(app)
      .put(`/admin/empresas/${idEmpresa}/autorizar`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ estado_publicacion: 'aprobada' });

    // Crear la oferta directamente
    const resOferta = await request(app)
      .post('/empresa/ofertas')
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({
        titulo: 'Oferta de prueba',
        descripcion: 'Descripción de la oferta',
        tipo_contrato: 'tiempo completo',
        modalidad: 'presencial',
        ubicacion: 'Ciudad de Prueba',
        salario: 50000,
        fecha_limite: '2099-12-31'
      });

    idOferta = resOferta.body.id || resOferta.body.oferta?.id;
  });

  // Tests para autorizar empresas
  describe('PUT /admin/empresas/:id/autorizar', () => {
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
      expect(res.body.message).toMatch(/faltan datos/i);
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

  // Tests para autorizar ofertas
  describe('PUT /admin/ofertas/:id/autorizar', () => {
    it('debería aprobar una oferta con token de admin', async () => {
      const res = await request(app)
        .put(`/admin/ofertas/${idOferta}/autorizar`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({ estado_publicacion: 'aprobada' });

      expect(res.statusCode).toBe(200);
      expect(res.body.mensaje || res.body.message).toMatch(/actualizado/i);
    });

    it('debería devolver 400 si falta el campo estado_publicacion', async () => {
      const res = await request(app)
        .put(`/admin/ofertas/${idOferta}/autorizar`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/faltan datos/i);
    });

    it('debería devolver 401 si no se envía token', async () => {
      const res = await request(app)
        .put(`/admin/ofertas/${idOferta}/autorizar`)
        .send({ estado_publicacion: 'aprobada' });

      expect(res.statusCode).toBe(401);
    });

    it('debería devolver 403 si el token no es de admin', async () => {
      const res = await request(app)
        .put(`/admin/ofertas/${idOferta}/autorizar`)
        .set('Authorization', `Bearer ${tokenEmpresa}`)
        .send({ estado_publicacion: 'aprobada' });

      expect(res.statusCode).toBe(403);
      const mensaje = res.body.mensaje || res.body.error || res.text || '';
      expect(mensaje).toMatch(/solo administradores/i);
    });
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
