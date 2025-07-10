import Joi from 'joi';

export const crearOfertaSchema = Joi.object({
  puesto_requerido: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().min(10).required(),

  nivel_educativo_requerido: Joi.string().min(3).required(),
  experiencia_requerida: Joi.string().allow(null, ''), 
  otros_requisitos: Joi.string().allow(null, ''),      

  lugar_trabajo: Joi.string().valid('Presencial', 'Remoto', 'Mixto').required(),
  modalidad: Joi.string().valid(
    'Tiempo completo',
    'Medio tiempo',
    'Contrato a plazo fijo',
    'Pasantía',
    'Freelance'
  ).required(),

  tipo_contrato: Joi.string().allow(null, ''),
  fecha_cierre: Joi.date().allow(null),
  localidad_del_puesto: Joi.string().min(1).max(100).allow(null,'')
});


export const editarOfertaSchema = crearOfertaSchema.fork(Object.keys(crearOfertaSchema.describe().keys), (schema) =>
  schema.optional()
);

