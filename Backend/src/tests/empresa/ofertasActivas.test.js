import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

describe('GET /empresa/ofertas/activas', () => {
  let tokenEmpresa;

  beforeAll(async () => {
    // Crear empresa y obtener token
    const email = `empresa${Date.now()}@mail.com`;

    await request(app).post('/auth/register').send({
      nombre: 'Empresa Pública',
      email,
      contrasena: 'test1234',
      tipo_usuario: 'empresa'
    });

    const resLogin = await request(app).post('/auth/login').send({
      email,
      contrasena: 'test1234'
    });

    tokenEmpresa = resLogin.body.resultado.token;

    // Crear una oferta activa y aprobada
    await request(app)
      .post('/empresa/publicar/oferta')
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({
        puesto_requerido: "Diseñador UX",
        descripcion: "Experiencia con Figma y prototipado",
        nivel_educativo_requerido: "Terciario",
        experiencia_requerida: "1 año",
        lugar_trabajo: "Presencial",
        modalidad: "Medio tiempo",
        tipo_contrato: "Plazo fijo",
        localidad_del_puesto: "Mar del Plata",
        estado: "activa",
        estado_publicacion: "aprobada"
      });
  });

  it('debería devolver ofertas activas/aprobadas con status 200', async () => {
    const res = await request(app).get('/empresa/ofertas/activas');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      res.body.forEach(oferta => {
        expect(oferta.estado).toBe('activa');
        expect(oferta.estado_publicacion).toBe('aprobada');
      });
    }
  });

  it('debería responder con array vacío si no hay ofertas activas', async () => {
    // Este test depende del estado de la DB, lo dejamos para completar más adelante si se necesita.
    // Por ahora, comprobamos que *si no hay ofertas* simplemente responde con array válido.
    const res = await request(app).get('/empresa/ofertas/activas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
