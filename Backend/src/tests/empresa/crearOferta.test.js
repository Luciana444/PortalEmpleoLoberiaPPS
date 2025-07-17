import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';

async function crearOferta(token) {
  const res = await request(app)
    .post('/empresa/ofertas')
    .set('Authorization', `Bearer ${token}`)
    .send({
      puesto_requerido: "QA Tester",
      descripcion: "Prueba eliminación de oferta",
      nivel_educativo_requerido: "Secundario",
      lugar_trabajo: "Remoto",
      modalidad: "Freelance"
    });

  console.log("Respuesta al crear oferta:", res.body); // 👈 esto te mostrará la estructura real

  return res.body.oferta?.id; // ✅ Asumimos que la propiedad correcta es esta
}

describe('POST /empresa/ofertas', () => {
  let tokenEmpresa;

  beforeAll(async () => {
    tokenEmpresa = await crearEmpresa();
  });

  it('debería crear una oferta con datos válidos y devolver status 200', async () => {
    const nuevaOferta = {
      puesto_requerido: "Dev Full Stack",
      descripcion: "Se busca dev con experiencia en Node.js y Angular",
      nivel_educativo_requerido: "Universitario",
      experiencia_requerida: "2 años",
      otros_requisitos: "Conocimiento en PostgreSQL",
      lugar_trabajo: "Remoto",
      modalidad: "Tiempo completo",
      tipo_contrato: "Relación de dependencia",
      fecha_cierre: "2025-08-01",
      localidad_del_puesto: "Bahía Blanca"
    };

    const res = await request(app)
      .post('/empresa/ofertas')
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send(nuevaOferta);

    expect(res.statusCode).toBe(200);
    expect(res.body.message || res.body.mensaje).toMatch(/creada correctamente/i);
  });

  it('debería devolver 400 si faltan campos requeridos', async () => {
    const ofertaIncompleta = {
      descripcion: "Falta el campo 'puesto_requerido'",
      nivel_educativo_requerido: "Secundario",
      lugar_trabajo: "Presencial",
      modalidad: "Medio tiempo"
    };

    const res = await request(app)
      .post('/empresa/ofertas')
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send(ofertaIncompleta);


expect(res.body.errores).toBeDefined();
expect(Array.isArray(res.body.errores)).toBe(true);
expect(res.body.errores[0]).toMatch(/puesto_requerido|is required/i);

  });

  it('debería devolver 401 si no se envía token', async () => {
    const res = await request(app)
      .post('/empresa/ofertas')
      .send({
        puesto_requerido: "Diseñador UI",
        descripcion: "Con experiencia en Figma",
        nivel_educativo_requerido: "Terciario",
        lugar_trabajo: "Remoto",
        modalidad: "Freelance"
      });

    expect(res.statusCode).toBe(401);
  });

//este falla pero anda bien en la app

  it('debería devolver 403 si el token no es de empresa', async () => {
    // Crear ciudadano
    const email = `ciudadano${Date.now()}@mail.com`;

    await request(app).post('/auth/register').send({
      nombre: 'Ciudadano Prueba',
      email,
      contrasena: 'test1234',
      tipo_usuario: 'ciudadano'
    });

    const resLogin = await request(app).post('/auth/login').send({
      email,
      contrasena: 'test1234'
    });

    const tokenCiudadano = resLogin.body.resultado.token;

    const res = await request(app)
      .post('/empresa/ofertas')
      .set('Authorization', `Bearer ${tokenCiudadano}`)
      .send({
        puesto_requerido: "Test",
        descripcion: "No debería poder postear",
        nivel_educativo_requerido: "Secundario",
        lugar_trabajo: "Remoto",
        modalidad: "Pasantía"
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.mensaje).toMatch(/solo empresas/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
