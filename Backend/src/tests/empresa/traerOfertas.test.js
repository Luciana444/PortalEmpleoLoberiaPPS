import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

async function crearEmpresaYObtenerToken() {
  const email = `empresa${Date.now()}@mail.com`;

  await request(app).post('/auth/register').send({
    nombre: 'Empresa Test',
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

describe('GET /empresa/traer/ofertas', () => {
  let tokenEmpresa;

  beforeAll(async () => {
    tokenEmpresa = await crearEmpresaYObtenerToken();

    // Cargar una oferta de prueba 
    await request(app)
      .post('/empresa/publicar/oferta')
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({
        puesto_requerido: "Frontend Developer",
        descripcion: "Desarrollador con experiencia en Angular",
        nivel_educativo_requerido: "Universitario",
        experiencia_requerida: "2 años",
        lugar_trabajo: "Remoto",
        modalidad: "Tiempo completo",
        tipo_contrato: "Indeterminado",
        localidad_del_puesto: "Lobería"
      });
  });

  it('debería devolver la lista de ofertas de la empresa con status 200', async () => {
    const res = await request(app)
      .get('/empresa/traer/ofertas')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería filtrar por estado_publicacion=pendiente', async () => {
    const res = await request(app)
      .get('/empresa/traer/ofertas?estado_publicacion=pendiente')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Opcional: verificar que todas las ofertas tengan ese estado
    res.body.forEach(oferta => {
      expect(oferta.estado_publicacion).toBe('pendiente');
    });
  });

  it('debería devolver 400 si el estado_publicacion es inválido', async () => {
    const res = await request(app)
      .get('/empresa/traer/ofertas?estado_publicacion=no_valido')
      .set('Authorization', `Bearer ${tokenEmpresa}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/estado.*no válido/i);
  });

  it('debería devolver 401 si no se envía token', async () => {
    const res = await request(app).get('/empresa/traer/ofertas');

    expect(res.statusCode).toBe(401);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
