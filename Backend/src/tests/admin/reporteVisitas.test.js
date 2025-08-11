// src/tests/admin/reporteVisitas.test.js
import request from 'supertest';
import app from '../../../app.js';
import { crearAdminYObtenerToken } from '../helpers/admin.js';
import { crearEmpresaYObtenerToken } from '../helpers/empresa.js';


describe('GET /admin/ver/visitas', () => {
  let tokenAdmin;
  let tokenDeUsuarioNoAdmin;

  beforeAll(async () => {
    tokenAdmin = await crearAdminYObtenerToken();
    // Asumimos que crearEmpresaYObtenerToken o similar está disponible para usuario no admin
    tokenDeUsuarioNoAdmin =  await crearEmpresaYObtenerToken(); // O reemplazar por token válido no admin
  });

  it('Debe devolver el reporte de visitas como admin', async () => {
    const res = await request(app)
      .get('/admin/ver/visitas')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('total_visitas');
    // Como el backend devuelve string, chequeamos que se pueda convertir a número
    expect(!isNaN(Number(res.body.total_visitas))).toBe(true);

    expect(res.body).toHaveProperty('visitas_admins');
    expect(res.body).toHaveProperty('visitas_anonimas');
    expect(res.body).toHaveProperty('visitas_ciudadanos');
    expect(res.body).toHaveProperty('visitas_empresas');

    ['visitas_admins', 'visitas_anonimas', 'visitas_ciudadanos', 'visitas_empresas'].forEach(key => {
      expect(!isNaN(Number(res.body[key]))).toBe(true);
    });
  });

  it('Debe devolver 403 si no es admin', async () => {
    const res = await request(app)
      .get('/admin/ver/visitas')
      .set('Authorization', `Bearer ${tokenDeUsuarioNoAdmin}`);

    expect(res.statusCode).toBe(403);
  });

  it('Debe devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .get('/admin/ver/visitas');

    expect(res.statusCode).toBe(401);
  });
});
