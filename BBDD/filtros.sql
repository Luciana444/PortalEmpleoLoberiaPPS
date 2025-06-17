
/*  =================================================================================================

FILTROS

================================================================================================
-- filtro de ofertas por estado, ubicacion y modalidad 

SELECT * FROM ofertas_laborales
WHERE estado = 'activa'
  AND ubicacion ILIKE '%Buenos Aires%'
  AND modalidad = 'remoto';

-- Filtro por tipo de contrato y fecha de publicacion


SELECT * FROM ofertas_laborales
WHERE estado = 'activa'
  AND tipo_contrato = 'freelance'
  AND fecha_publicacion >= now() - interval '15 days';


-- filtro por palabra clave

SELECT * FROM ofertas_laborales
WHERE estado = 'activa'
  AND (titulo ILIKE '%desarrollador%' OR descripcion ILIKE '%desarrollador%');


-- conbinacion de filtros, por estado, modalidad, ubicacion y palabras claves: 

SELECT * FROM ofertas_laborales
WHERE estado = 'activa'
  AND modalidad = 'remoto'
  AND ubicacion ILIKE '%cordoba%'
  AND (titulo ILIKE '%fullstack%' OR descripcion ILIKE '%fullstack%');


 */