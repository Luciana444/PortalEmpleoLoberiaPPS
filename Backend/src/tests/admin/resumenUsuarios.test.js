// src/tests/admin/resumenUsuarios.test.js
import request from 'supertest';
import app from '../../../app.js';
import { crearAdminYObtenerToken } from '../helpers/admin.js';
import { crearEmpresaYObtenerToken } from '../helpers/empresa.js';

describe('GET /admin/usuarios/resumen', () => {
  let tokenAdmin;
  let tokenDeUsuarioNoAdmin;
  

  beforeAll(async () => {
    tokenAdmin = await crearAdminYObtenerToken();
    tokenDeUsuarioNoAdmin = await crearEmpresaYObtenerToken();
  });

  it('Debe devolver el resumen de usuarios como admin', async () => {
    const res = await request(app)
      .get('/admin/usuarios/resumen')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('total_ciudadanos');
    expect(res.body).toHaveProperty('total_empresas');
    expect(res.body).toHaveProperty('total_usuarios');

    expect(Number(res.body.total_ciudadanos)).not.toBeNaN();
    expect(Number(res.body.total_empresas)).not.toBeNaN();
    expect(Number(res.body.total_usuarios)).not.toBeNaN();
  });

  it('Debe devolver 403 si no es admin', async () => {
    const res = await request(app)
      .get('/admin/usuarios/resumen')
      .set('Authorization', `Bearer ${tokenDeUsuarioNoAdmin}`);

    expect(res.statusCode).toBe(403);
  });

  it('Debe devolver 401 si no se envía token', async () => {
    const res = await request(app).get('/admin/usuarios/resumen');

    expect(res.statusCode).toBe(401);
  });
});
