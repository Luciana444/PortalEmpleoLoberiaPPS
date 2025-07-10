import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';



// Función auxiliar para crear empresa y obtener token
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

describe('PATCH /empresa/actualizar/perfil', () => {
  let tokenEmpresa;

  beforeAll(async () => {
    tokenEmpresa = await crearEmpresaYObtenerToken();
  });

  it('debe actualizar el perfil de la empresa con datos válidos', async () => {
    const res = await request(app)
      .patch('/empresa/actualizar/perfil')
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({
        nombre_empresa: "Tech Solutions SRL",
        email_contacto: "contacto@tech.com",
        logo: "https://example.com/logo.png",
        sitio_web: "https://techsolutions.com",
        cuit: "30712345678",
        rubro: "Desarrollo de software",
        telefono: "123456789",
        calle: "Av. Siempre Viva",
        numero: "742",
        piso: "1",
        dpto: "B",
        localidad: "Springfield",
        provincia: "Buenos Aires",
        pais: "Argentina"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje || res.body.message).toMatch(/actualizado/i);
  });

  it('debe rechazar la actualización sin token', async () => {
    const res = await request(app)
      .patch('/empresa/actualizar/perfil')
      .send({
        nombre_empresa: "Tech Solutions SRL"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/token/i);
  });

  it('debe rechazar si el usuario no es empresa', async () => {
    // Creamos un usuario ciudadano para probar acceso no autorizado
    const email = `ciudadano${Date.now()}@mail.com`;

    await request(app).post('/auth/register').send({
      nombre: 'Ciudadano Test',
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
      .patch('/empresa/actualizar/perfil')
      .set('Authorization', `Bearer ${tokenCiudadano}`)
      .send({
        nombre_empresa: "No debería poder actualizar"
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.error || res.body.mensaje || res.text).toMatch(/no autorizado|solo empresas/i);
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
