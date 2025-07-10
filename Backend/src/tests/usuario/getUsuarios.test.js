
// src/tests/usuario/getUsuarios.test.js

import request from 'supertest';
import app from '../../../app.js';
import sql from '../../database/db.js';


describe('GET/usuario', () => {
  it('debe devolver un array con todos los usuarios', async () => {
    const response = await request(app).get('/usuario');
    
    expect(response.statusCode).toBe(200); // Verifica que el status sea 200 OK
    expect(Array.isArray(response.body)).toBe(true); // El body debe ser un array
    if(response.body.length > 0){
            
      expect(response.body[0]).toHaveProperty('nombre');   // y 'nombre'
      expect(response.body[0]).toHaveProperty('email');    // y 'email'
      expect(response.body[0]).toHaveProperty('tipo_usuario'); // Tiene tipo_usuario
      // No chequeamos id porque no queremos que esté
      expect(response.body[0]).not.toHaveProperty('id'); 
    }
  });
});

afterAll(async () => {
  await sql.end({ timeout: 5 });
});
