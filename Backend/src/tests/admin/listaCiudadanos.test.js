import request from 'supertest';
import app from '../../../app.js';
import { crearAdminYObtenerToken } from '../helpers/admin.js';
import { crearEmpresaYObtenerToken } from '../helpers/empresa.js';

describe('GET /admin/ciudadanos', () => {
  let tokenAdmin;
  let tokenNoAdmin;

  beforeAll(async () => {
    tokenAdmin = await crearAdminYObtenerToken();
    tokenNoAdmin = await crearEmpresaYObtenerToken();
  });

  it('Debe obtener la lista completa de ciudadanos como admin', async () => {
    const res = await request(app)
      .get('/admin/ciudadanos')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const ciudadano = res.body[0];
      expect(ciudadano).toHaveProperty('id');
      expect(ciudadano).toHaveProperty('nombre');
      expect(ciudadano).toHaveProperty('apellido');
      expect(ciudadano).toHaveProperty('email');
      expect(ciudadano).toHaveProperty('telefono');
      expect(ciudadano).toHaveProperty('dni');
    }
  });

  it('Debe devolver 403 si no es admin', async () => {
    const res = await request(app)
      .get('/admin/ciudadanos')
      .set('Authorization', `Bearer ${tokenNoAdmin}`);

    expect(res.statusCode).toBe(403);
  });

  it('Debe devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .get('/admin/ciudadanos');

    expect(res.statusCode).toBe(401);
  });
});
