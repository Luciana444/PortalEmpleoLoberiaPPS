



import request from 'supertest';
import app from '../../app.js';

//caso feliz: recibe todos los datos necesarios para registro exitoso:

describe('POST /auth/register', () => {
  it('debe registrar un usuario nuevo correctamente', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'Test Usuario',
        email: `test${Date.now()}@mail.com`,
        contrasena: 'test1234',
        tipo_usuario: 'ciudadano'
      });

    expect(response.statusCode).toBe(201); 
    expect(response.body).toHaveProperty('message');
  });

//===============================================================================
//casos negativos: faltan datos o datos erroneos:
//===============================================================================

//sin email:

test('Debe rechazar registro sin email', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'Test Usuario',
        email: '',
        contrasena: 'test1234',
        tipo_usuario: 'ciudadano',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/todos los campos son obligatorios/i);
  });

//------------------------------------------------------
  //email invalido:

  test('Debe rechazar registro con email inválido', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'Test Usuario',
        email: 'correo-no-valido',
        contrasena: 'test1234',
        tipo_usuario: 'ciudadano',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/email inválido/i);
  });

//---------------------------------------------------------
//sin contraseña:

  test('Debe rechazar registro sin contraseña', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'Test Usuario',
        email: `test${Date.now()}@mail.com`,
        contrasena: '',
        tipo_usuario: 'ciudadano',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/todos los campos son obligatorios/i);
  });


  //--------------------------------------------------
  //contraseña muy corta:

  test('Debe rechazar registro con contraseña muy corta', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'Test Usuario',
        email: `test${Date.now()}@mail.com`,
        contrasena: '123',
        tipo_usuario: 'ciudadano',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/contraseña.*corta/i);
  });


  //-------------------------------------------------------
  //email ya registrado:

  test('Debe rechazar registro con email ya registrado', async () => {
    const emailDuplicado = `testduplicado@mail.com`;

    // Primero creo el usuario con ese email
    await request(app)
      .post('/auth/register')
      .send({
        nombre: 'Usuario Existente',
        email: emailDuplicado,
        contrasena: 'test1234',
        tipo_usuario: 'ciudadano',
      });


    // Ahora intento registrar otro con el mismo email
    const response = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'Usuario Nuevo',
        email: emailDuplicado,
        contrasena: 'test1234',
        tipo_usuario: 'ciudadano',
      });

    expect(response.status).toBe(409); // Código típico para conflicto
    expect(response.body.error).toMatch(/email.*existente|duplicado/i);
  });

//--------------------------------------------------------------
//usuario invalido:

  test('Debe rechazar registro con tipo de usuario inválido', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        nombre: 'Test Usuario',
        email: `test${Date.now()}@mail.com`,
        contrasena: 'test1234',
        tipo_usuario: 'alienígena', // tipo inválido
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/tipo de usuario/i);
  });

});




