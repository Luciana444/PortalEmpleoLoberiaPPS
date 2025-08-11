import request from 'supertest';
import app from '../../../app.js';
import { crearAdminYObtenerToken } from '../helpers/admin.js';
import { crearEmpresaYObtenerToken } from '../helpers/empresa.js';

describe('GET /admin/empresas', () => {
  let tokenAdmin;
  let tokenDeUsuarioNoAdmin;

  beforeAll(async () => {
    tokenAdmin = await crearAdminYObtenerToken();
    tokenDeUsuarioNoAdmin = await crearEmpresaYObtenerToken();
  });

  it('Debe obtener la lista completa de empresas como admin', async () => {
    const res = await request(app)
      .get('/admin/empresas')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const empresa = res.body[0];
      expect(empresa).toHaveProperty('id');
      expect(empresa).toHaveProperty('nombre_empresa');
      expect(empresa).toHaveProperty('cuit');
      expect(empresa).toHaveProperty('email_contacto');
      expect(empresa).toHaveProperty('telefono');
      expect(empresa).toHaveProperty('rubro');
    }
  });

  it('Debe devolver 403 si no es admin', async () => {
    const res = await request(app)
      .get('/admin/empresas')
      .set('Authorization', `Bearer ${tokenDeUsuarioNoAdmin}`);

    expect(res.statusCode).toBe(403);
  });

  it('Debe devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .get('/admin/empresas');

    expect(res.statusCode).toBe(401);
  });
});
