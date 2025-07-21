import {
  crearCiudadanoYObtenerToken,
  crearEmpresa,
  //postularCiudadanoAOferta,
} from './testHelpers.js';

describe('Test helpers básicos', () => {
  it('debería crear un ciudadano y devolver token', async () => {
    const { ciudadano, token } = await crearCiudadanoYObtenerToken();
    expect(ciudadano).toHaveProperty('id');
    expect(ciudadano).toHaveProperty('email');
    expect(token).toBeDefined();
  });

  it('debería crear empresa, oferta y devolver token', async () => {
    const { empresa, oferta, token } = await crearEmpresa();
    expect(empresa).toHaveProperty('id');
    expect(oferta).toHaveProperty('id');
    expect(token).toBeDefined();
    expect(oferta.estado).toBe('activa');
  });

  /*
  it('debería postular ciudadano a oferta sin errores', async () => {
    const { ciudadano, token } = await crearCiudadanoYObtenerToken();
    const { oferta } = await crearEmpresaYOferta();

    await expect(postularCiudadanoAOferta(ciudadano.id, oferta.id)).resolves.not.toThrow();
  });*/
});

