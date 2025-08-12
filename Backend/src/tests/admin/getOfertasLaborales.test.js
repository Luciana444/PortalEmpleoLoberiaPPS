// src/tests/admin/ofertasLaborales.test.js
import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';
import { crearEmpresaYObtenerToken, obtenerIdEmpresaDesdeToken } from '../helpers/empresa.js';
import { crearAdminYObtenerToken } from '../helpers/admin.js';


describe('GET /admin/ofertas/laborales', () => {
  let tokenAdmin;
  let tokenDeUsuarioNoAdmin;

  beforeAll(async () => {
    // Crear admin y obtener token
    tokenAdmin = await crearAdminYObtenerToken();
    tokenDeUsuarioNoAdmin= await crearEmpresaYObtenerToken();
  });

  it('Debe obtener todas las ofertas laborales como admin', async () => {
    const res = await request(app)
      .get('/admin/ofertas/laborales')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const oferta = res.body[0];
      expect(oferta).toHaveProperty('id');
      expect(oferta).toHaveProperty('puesto_requerido');
      expect(oferta).toHaveProperty('descripcion');
      expect(oferta).toHaveProperty('estado_publicacion');
      expect(oferta).toHaveProperty('fecha_publicacion');
      expect(oferta).toHaveProperty('nombre_empresa');

    }
  });

  it('Debe filtrar las ofertas por estado_publicacion', async () => {
    const estado = 'pendiente';
    const res = await request(app)
      .get(`/admin/ofertas/laborales?estado_publicacion=${estado}`)
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      res.body.forEach(oferta => {
        expect(oferta.estado_publicacion).toBe(estado);
      });
    }
  });

  it('Debe devolver 403 si no es admin', async () => {
    const res = await request(app)
      .get('/admin/ofertas/laborales')
      .set('Authorization', `Bearer ${tokenDeUsuarioNoAdmin}`);

    expect(res.statusCode).toBe(403);
  });

  it('Debe devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .get('/admin/ofertas/laborales');

    expect(res.statusCode).toBe(401);
  });
});

// Nuevo bloque para /admin/ofertas_totales
describe('GET /admin/ofertas_totales', () => {
  let tokenAdmin;
  let tokenDeUsuarioNoAdmin;

  beforeAll(async () => {
    tokenAdmin = await crearAdminYObtenerToken();
    tokenDeUsuarioNoAdmin = await crearEmpresaYObtenerToken();
  });

  it('Debe devolver la cantidad total de ofertas laborales como admin', async () => {
    const res = await request(app)
      .get('/admin/ofertas_totales')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
expect(res.body).toHaveProperty('count');
expect(typeof Number(res.body.count)).toBe('number');


  });

  it('Debe devolver 403 si no es admin', async () => {
    const res = await request(app)
      .get('/admin/ofertas_totales')
      .set('Authorization', `Bearer ${tokenDeUsuarioNoAdmin}`);

    expect(res.statusCode).toBe(403);
  });

  it('Debe devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .get('/admin/ofertas_totales');

    expect(res.statusCode).toBe(401);
  });
});