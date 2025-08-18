📘 Rutas: Empresa

Este módulo maneja las rutas relacionadas con la gestión del perfil de la empresa y sus ofertas laborales.
Incluye actualizar perfil, obtener datos de la empresa, gestionar ofertas, ver postulaciones, CVs, perfiles de postulantes y notificaciones.

📝 PATCH /empresa/actualizar/perfil

Descripción: Actualiza los datos del perfil de la empresa autenticada.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📤 Body esperado (JSON):
{
  "nombre_empresa": "string",
  "email_contacto": "string",
  "logo": "string (URL)",
  "sitio_web": "string (URL)",
  "cuit": "string",
  "rubro": "string",
  "telefono": "string",
  "calle": "string",
  "numero": "string",
  "piso": "string",
  "dpto": "string",
  "localidad": "string",
  "provincia": "string",
  "pais": "string"
}

📥 Posibles respuestas:

200 OK: Perfil actualizado correctamente.

400 Bad Request: Datos inválidos.

401 Unauthorized: No autorizado.

500 Internal Server Error: Error del servidor.

📥 GET /empresa/datos

Descripción: Obtiene los datos del perfil de la empresa autenticada.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📥 Posibles respuestas:

200 OK: Datos de la empresa obtenidos correctamente.

{
  "id_usuario": "string",
  "nombre_empresa": "string",
  "email_contacto": "string",
  "logo": "string (URL)",
  "sitio_web": "string (URL)",
  "cuit": "string",
  "rubro": "string",
  "telefono": "string",
  "calle": "string",
  "numero": "string",
  "piso": "string",
  "dpto": "string",
  "localidad": "string",
  "provincia": "string",
  "pais": "string"
}


401 Unauthorized: No autorizado.

404 Not Found: Empresa no encontrada.

500 Internal Server Error: Error del servidor.

📥 GET /empresa/traer/ofertas

Descripción: Obtiene las ofertas laborales de la empresa autenticada.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📤 Parámetros opcionales:
Nombre	Tipo	Descripción
estado_publicacion	string	Filtrar las ofertas por estado (pendiente, aprobada, rechazada)
📥 Posibles respuestas:

200 OK: Lista de ofertas laborales de la empresa.

400 Bad Request: Estado de publicación no válido.

401 Unauthorized: Empresa no autenticada.

500 Internal Server Error: Error interno del servidor al obtener las ofertas.

📥 GET /empresa/ofertas/activas

Descripción: Obtiene todas las ofertas laborales activas/aprobadas disponibles públicamente.
Requiere autenticación: ❌ No

📥 Posibles respuestas:

200 OK: Lista de ofertas activas.

500 Internal Server Error: Error interno al obtener ofertas activas.

📤 POST /empresa/ofertas

Descripción: Permite a la empresa crear una nueva oferta laboral.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📤 Body esperado (JSON):
{
  "puesto_requerido": "string",
  "descripcion": "string",
  "nivel_educativo_requerido": "string",
  "experiencia_requerida": "string (opcional)",
  "otros_requisitos": "string (opcional)",
  "lugar_trabajo": "Presencial | Remoto | Mixto",
  "modalidad": "Tiempo completo | Medio tiempo | Contrato a plazo fijo | Pasantía | Freelance",
  "tipo_contrato": "string (opcional)",
  "fecha_cierre": "string (fecha, opcional)",
  "localidad_del_puesto": "string (opcional)"
}

📥 Posibles respuestas:

200 OK: Oferta creada correctamente.

400 Bad Request: Datos inválidos o faltantes.

401 Unauthorized: No autorizado.

500 Internal Server Error: Error interno al crear la oferta.

🗑 DELETE /empresa/eliminar/oferta/:id

Descripción: Elimina una oferta laboral de la empresa autenticada.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📤 Parámetros:
Nombre	Tipo	Descripción
id	string	ID de la oferta a eliminar
📥 Posibles respuestas:

200 OK: Oferta eliminada correctamente.

{ "message": "Oferta eliminada correctamente" }


400 Bad Request: Faltan datos necesarios.

403 Forbidden: La oferta no pertenece a la empresa autenticada.

404 Not Found: Oferta no encontrada.

500 Internal Server Error: Error interno al eliminar la oferta.

📝 PATCH /empresa/ofertas/:id

Descripción: Edita una oferta laboral existente de la empresa autenticada.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📤 Parámetros:
Nombre	Tipo	Descripción
id	string	ID de la oferta a editar
📤 Body esperado (JSON):
{
  "puesto_requerido": "string",
  "descripcion": "string",
  "nivel_educativo_requerido": "string",
  "experiencia_requerida": "string (opcional)",
  "otros_requisitos": "string (opcional)",
  "lugar_trabajo": "Presencial | Remoto | Mixto",
  "modalidad": "Tiempo completo | Medio tiempo | Contrato a plazo fijo | Pasantía | Freelance",
  "tipo_contrato": "string (opcional)",
  "fecha_cierre": "string (fecha, opcional)",
  "localidad_del_puesto": "string (opcional)"
}

📥 Posibles respuestas:

200 OK: Oferta editada correctamente.

400 Bad Request: Datos inválidos o faltantes.

404 Not Found: Oferta o empresa no encontrada.

500 Internal Server Error: Error interno, oferta no editable o no autorizada.

📥 GET /empresa/notificaciones

Descripción: Obtiene las notificaciones de la empresa autenticada.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📥 Posibles respuestas:

200 OK: Lista de notificaciones obtenidas correctamente.

401 Unauthorized: Empresa no autenticada.

500 Internal Server Error: Error interno al obtener notificaciones.

📥 GET /empresa/ofertas/:id/postulaciones

Descripción: Obtiene las postulaciones de una oferta publicada por la empresa autenticada.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📤 Parámetros:
Nombre	Tipo	Descripción
id	string	ID de la oferta laboral
📥 Posibles respuestas:

200 OK: Lista de postulaciones de la oferta.

401 Unauthorized: Token ausente o inválido.

403 Forbidden: Solo empresas pueden consultar este recurso.

404 Not Found: Oferta no encontrada.

500 Internal Server Error: Error del servidor o acceso a oferta ajena.

📥 GET /empresa/postulaciones/:id/cv

Descripción: Obtiene el CV del postulante para una postulación específica.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📤 Parámetros:
Nombre	Tipo	Descripción
id	string	ID de la postulación
📥 Posibles respuestas:

200 OK: CV devuelto correctamente (contenido PDF).

401 Unauthorized: Token inválido o ausente.

403 Forbidden: Solo empresas autorizadas pueden acceder al CV.

404 Not Found: Postulación no encontrada o sin CV asociado.

500 Internal Server Error: Error interno del servidor.

📥 GET /empresa/postulaciones/:id/perfil

Descripción: Obtiene el perfil completo del ciudadano que se postuló a una oferta.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📤 Parámetros:
Nombre	Tipo	Descripción
id	string	ID de la postulación
📥 Posibles respuestas:

200 OK: Perfil del ciudadano obtenido correctamente.

401 Unauthorized: Token ausente o inválido.

403 Forbidden: La postulación no pertenece a una oferta de esta empresa.

404 Not Found: Postulación no encontrada.

500 Internal Server Error: Error interno del servidor.

📥 GET /empresa/:id/datos_empresa

Descripción: Obtiene información de una empresa por su ID.
Requiere autenticación: ✅ Sí (token Bearer)

📤 Parámetros:
Nombre	Tipo	Descripción
id	string	ID de la empresa
📥 Posibles respuestas:

200 OK: Información de la empresa obtenida correctamente.

400 Bad Request: ID de empresa inválido o faltante.

404 Not Found: Empresa no encontrada.

500 Internal Server Error: Error interno del servidor.

📥 GET /empresa/notificaciones/ofertas

Descripción: Obtiene (y elimina) la notificación pendiente para la empresa.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Empresa

📥 Posibles respuestas:

200 OK: Notificación obtenida correctamente.

204 No Content: No hay notificaciones disponibles.

401 Unauthorized: Empresa no autenticada.

403 Forbidden: Requiere rol de empresa.

500 Internal Server Error: Error interno al obtener notificación.