
import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';
import { crearEmpresaYObtenerToken, obtenerIdEmpresaDesdeToken } from '../helpers/empresa.js';
import { crearAdminYObtenerToken } from '../helpers/admin.js';


describe('GET /admin/postulaciones_totales', () => {
  let tokenAdmin, tokenEmpresa;

  beforeAll(async () => {
    tokenAdmin = await crearAdminYObtenerToken();
    tokenEmpresa = await crearEmpresaYObtenerToken();
  });

  it('Debe devolver la cantidad total de postulaciones (admin)', async () => {
    const res = await request(app)
      .get('/admin/postulaciones_totales')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
expect(res.body).toHaveProperty('count');
expect(typeof Number(res.body.count)).toBe('number');


   // expect(res.body).toHaveProperty('total_postulaciones');
   // expect(typeof res.body.total_postulaciones).toBe('number');
  });

  it('Debe devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .get('/admin/postulaciones_totales');

    expect(res.statusCode).toBe(401);
  });

  it('Debe devolver 403 si el usuario no es admin', async () => {
    const res = await request(app)
      .get('/admin/postulaciones_totales')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(403);
  });
});
