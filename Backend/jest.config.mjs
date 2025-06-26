
export default {
  testEnvironment: 'node',

  // El transform vacío indica que no usamos Babel ni TypeScript
  transform: {},

  // Mapeo de rutas para importar bien los módulos con extensión .js
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  }
};
