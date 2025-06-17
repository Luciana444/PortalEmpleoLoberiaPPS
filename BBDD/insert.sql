
/* =======================================================================================

Inserts usuarios:
=======================================================================================

INSERT INTO usuarios (nombre, email, contrasena, tipo_usuario)
VALUES 
('Juan Pérez', 'juan.perez@mail.com', 'hash_contrasena_juan', 'ciudadano'),
('Empresa XYZ', 'contacto@empresa.xyz', 'hash_contrasena_empresa', 'empresa'),
('Admin Portal', 'admin@portalempleo.com', 'hash_contrasena_admin', 'admin');

======================================================================================
Insert en empresa:
======================================================================================

SELECT id, nombre FROM usuarios WHERE tipo_usuario = 'empresa';

INSERT INTO empresas (id_usuario, nombre_empresa, direccion, telefono, sitio_web)
VALUES (
  'e095655f-bf20-4a5c-b504-53efdf7ee7dc',
  'Empresa XYZ',
  'Av. Siempre Viva 123',
  '1234-5678',
  'https://www.empresaxyz.com'
);

===================================================================================
Insert pra perfil ciudadano
===================================================================================

SELECT id, nombre FROM usuarios WHERE tipo_usuario = 'ciudadano';

INSERT INTO perfiles_usuarios (
  id_usuario,
  fecha_nacimiento,
  telefono,
  educacion,
  experiencia,
  habilidades,
  cv_url,
  imagen_url
)
VALUES (
  '4e25e51d-9404-44c0-adc6-fe2588180169', -- ID del ciudadano
  '1985-07-12',
  '1122334455',
  'Técnico en Informática',
  '5 años en soporte técnico y redes',
  'Soporte técnico, Redes, Atención al cliente',
  'https://miportal.com/cv/juanperez.pdf',
  'https://miportal.com/fotos/juanperez.jpg'
);


========================================================================================
insert ofertas
========================================================================================
buscar el id de la empresa:

SELECT id, nombre_empresa FROM empresas WHERE id_usuario = 'e095655f-bf20-4a5c-b504-53efdf7ee7dc';

--controlar:

SELECT id, nombre_empresa FROM empresas WHERE id = 'f6865fdb-37a2-48ee-b9d9-f39021f5bc61';


INSERT INTO ofertas_laborales (
  id_empresa,
  titulo,
  descripcion,
  requisitos,
  ubicacion,
  modalidad,
  tipo_contrato,
  fecha_publicacion,
  fecha_cierre,
  estado
)
VALUES (
  'f6865fdb-37a2-48ee-b9d9-f39021f5bc61',
  'Desarrollador Java Jr.',
  'Se busca desarrollador con conocimientos en Java y bases de datos.',
  'Java, SQL, PostgreSQL, trabajo en equipo',
  'Buenos Aires, Argentina',
  'remoto',
  'full-time',
  now(),
  '2025-07-31',
  'activa'
);


===================================================================================
Insert postulaciones
===================================================================================

1)Buscar el id del usuario: 

SELECT id, nombre, email
FROM usuarios
WHERE tipo_usuario = 'ciudadano';

2) Buscar el id de la oferta:

SELECT id, titulo, fecha_publicacion, estado
FROM ofertas_laborales
WHERE estado = 'activa';



INSERT INTO postulaciones (
  id_usuario,
  id_oferta,
  mensaje,
  cv_url
)
VALUES (
  '4e25e51d-9404-44c0-adc6-fe2588180169',
  'a719029b-839c-466a-bb7a-bc61b6a9df13',
  'Estoy muy interesada en esta oferta. Considero que cumplo con los requisitos.',
  'https://ejemplo.com/cv_postulanteX.pdf'
);

 */