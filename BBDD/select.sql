
/* =================================================================================
 SELECT
===============================================================================

SELECT * FROM postulaciones;
---------------------------------
SELECT * FROM ofertas_laborales;
---------------------------------

-- lista de ususarios
SELECT id, nombre, email, tipo_usuario, fecha_registro, estado
FROM usuarios;

----------------------------------


--empresas registradas

SELECT e.id, u.nombre AS nombre_usuario, e.nombre_empresa, e.direccion, e.telefono, e.sitio_web
FROM empresas e
JOIN usuarios u ON e.id_usuario = u.id;

-------------------------------------
--perfiles ciudadanos

SELECT p.id, u.nombre, p.fecha_nacimiento, p.telefono, p.educacion, p.experiencia, p.habilidades, p.cv_url, p.imagen_url
FROM perfiles_usuarios p
JOIN usuarios u ON p.id_usuario = u.id;

------------------------------------
--ofertas laborales activas

SELECT o.id, e.nombre_empresa, o.titulo, o.descripcion, o.requisitos, o.ubicacion, o.modalidad, o.tipo_contrato, o.fecha_publicacion, o.fecha_cierre, o.estado
FROM ofertas_laborales o
JOIN empresas e ON o.id_empresa = e.id
WHERE o.estado = 'activa';

------------------------------------
--postulaciones de los ciudadanos

SELECT p.id, u.nombre AS ciudadano, o.titulo AS oferta, p.fecha_postulacion, p.estado, p.mensaje, p.cv_url
FROM postulaciones p
JOIN usuarios u ON p.id_usuario = u.id
JOIN ofertas_laborales o ON p.id_oferta = o.id;


 */