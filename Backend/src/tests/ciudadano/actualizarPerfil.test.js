import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';


let token;
let email;

beforeAll(async () => {
  email = `ciudadano${Date.now()}@mail.com`;

  // Registro
  await request(app).post('/auth/register').send({
    nombre: 'Ciudadano Test',
    email,
    contrasena: 'test1234',
    tipo_usuario: 'ciudadano'
  });

  // Login
  const resLogin = await request(app).post('/auth/login').send({
    email,
    contrasena: 'test1234'
  });

  token = resLogin.body.resultado.token;
});

describe('PATCH /ciudadano/actualizar/perfil', () => {
  it('debe actualizar el perfil del ciudadano con éxito', async () => {
    const response = await request(app)
      .patch('/ciudadano/actualizar/perfil')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nombre: 'Nuevo Nombre',
        apellido: 'Nuevo Apellido',
        fecha_nacimiento: '1995-05-05',
        telefono: '123456789',
        email: email,
        dni: '12345678',
        cuil: '20123456789',
        calle: 'Av Siempre Viva',
        numero: '742',
        piso: '1',
        dpto: 'A',
        localidad: 'Springfield',
        provincia: 'Buenos Aires',
        pais: 'Argentina',
        nivel_educativo: 'Secundario completo',
        esta_cursando_carrera: false,
        carrera_en_curso: '',
        situacion_laboral: 'Desempleado',
        tiene_emprendimiento: 'no',
        discapacidad: 'ninguna',

        // Agregamos capacitación
        nombre_capacitacion: 'Curso de Automatización de Pruebas',

        // Agregamos experiencia laboral
        nombre_empresa: 'Empresa Test S.A.',
        desde: '2020-01-01',
        hasta: '2021-01-01',
        comentario: 'Un año de experiencia en testing'
      });
    console.log('Respuesta del backend:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.mensaje || response.body.message).toMatch(/actualizado/i);
  });
});



afterAll(async () => {
  await sql.end({ timeout: 5 });
});
