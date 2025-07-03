import Joi from 'joi';

export const empresaValidation = Joi.object({
  nombre_empresa: Joi.string().min(2).max(100),
  email_contacto: Joi.string().email(),
  logo: Joi.string().uri().allow(null, ''), 
  sitio_web: Joi.string().uri().allow(null, ''),
  cuit: Joi.string().pattern(/^\d{11}$/).messages({
    'string.pattern.base': 'El CUIT debe tener exactamente 11 dígitos numéricos.'
  }),
  rubro: Joi.string().max(100).allow(null, ''),
  telefono: Joi.string().pattern(/^\d{6,15}$/).allow(null, '').messages({
    'string.pattern.base': 'El teléfono debe contener entre 6 y 15 dígitos numéricos.'
  }),
  calle: Joi.string().min(1),
  numero: Joi.string().min(1),
  piso: Joi.string().allow(null, ''),
  dpto: Joi.string().allow(null, ''),
  localidad: Joi.string().min(1),
  provincia: Joi.string().min(1),
  pais: Joi.string().min(1),
  estado_aprobacion: Joi.string().valid('pendiente', 'aprobada', 'rechazada').allow(null),
  fecha_aprobacion: Joi.date().allow(null),
  email_admin_autorizador: Joi.string().email().allow(null, '')
}).min(1); 