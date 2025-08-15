📘 Rutas: Administrador

Este módulo maneja las rutas disponibles solo para administradores.
Permite consultar métricas, obtener reportes, listar usuarios y empresas, y autorizar ofertas y empresas.

📥 GET /admin/postulaciones_totales

Descripción: Obtener la cantidad total de postulaciones registradas.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📥 Posibles respuestas:

200 OK

{ "total_postulaciones": 152 }


401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido - Requiere rol de administrador.

500 Internal Server Error: Error interno del servidor.

📥 GET /admin/ofertas/laborales

Descripción: Obtener todas las ofertas laborales, con posibilidad de filtrar por estado de publicación.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📤 Parámetros opcionales (query):
Nombre	Tipo	Descripción
estado_publicacion	string	Filtrar ofertas por estado (pendiente, aprobada, rechazada, finalizada)
📥 Posibles respuestas:

200 OK: Lista de ofertas laborales obtenida correctamente.

[
  {
    "id": "uuid",
    "titulo": "string",
    "descripcion": "string",
    "estado_publicacion": "pendiente",
    "fecha_creacion": "2025-08-05",
    "empresa": "Nombre de la empresa"
  }
]


401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido.

500 Internal Server Error: Error interno del servidor.

📥 GET /admin/ofertas_totales

Descripción: Obtener la cantidad total de ofertas laborales.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📥 Posibles respuestas:

200 OK

{ "total": 124 }


401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido.

500 Internal Server Error: Error interno del servidor.

📥 GET /admin/usuarios/resumen

Descripción: Obtener un resumen de usuarios registrados por tipo (ciudadanos, empresas, administradores).
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📥 Posibles respuestas:

200 OK

{
  "ciudadanos": 150,
  "empresas": 45,
  "administradores": 3
}


401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido.

500 Internal Server Error: Error interno del servidor.

📥 GET /admin/ver/visitas

Descripción: Obtener reporte de visitas al portal.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📥 Posibles respuestas:

200 OK

{
  "total_visitas": 1250,
  "visitas_por_dia": [
    { "fecha": "2025-08-05", "cantidad": 50 }
  ]
}


401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido.

500 Internal Server Error: Error interno del servidor.

📥 GET /admin/generar_reporte

Descripción: Generar y descargar el reporte de métricas del sistema.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📥 Posibles respuestas:

200 OK: Retorna un archivo binario (octet-stream) con el reporte.

401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido.

500 Internal Server Error: Error interno al generar el reporte.

📥 GET /admin/ciudadanos

Descripción: Obtener lista completa de ciudadanos registrados.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📥 Posibles respuestas:

200 OK

[
  {
    "id": "uuid",
    "nombre": "string",
    "apellido": "string",
    "email": "string",
    "telefono": "string",
    "dni": "string"
  }
]


401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido.

500 Internal Server Error: Error interno al obtener la lista de ciudadanos.

📥 GET /admin/empresas

Descripción: Obtener lista completa de empresas registradas.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📥 Posibles respuestas:

200 OK

[
  {
    "id": "uuid",
    "nombre": "string",
    "cuit": "string",
    "email": "string",
    "telefono": "string",
    "rubro": "string"
  }
]


401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido.

500 Internal Server Error: Error interno al obtener la lista de empresas.

📤 PUT /admin/ofertas/:id/autorizar

Descripción: Autorizar o rechazar una oferta laboral.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📤 Parámetros:
Nombre	Tipo	Descripción
id	string	ID de la oferta laboral
📤 Body esperado (JSON):
{
  "estado_publicacion": "aprobada"
}

📥 Posibles respuestas:

200 OK: Estado de publicación actualizado correctamente.

400 Bad Request: Faltan datos en la solicitud.

401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido.

500 Internal Server Error: Error interno al actualizar estado.

📤 PUT /admin/empresas/:id/autorizar

Descripción: Autorizar o rechazar una empresa.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Administrador

📤 Parámetros:
Nombre	Tipo	Descripción
id	string	ID de la empresa
📤 Body esperado (JSON):
{
  "estado_publicacion": "aprobada"
}

📥 Posibles respuestas:

200 OK: Estado de aprobación actualizado correctamente.

400 Bad Request: Faltan datos en la solicitud.

401 Unauthorized: Token ausente o inválido.

403 Forbidden: Acceso prohibido.

500 Internal Server Error: Error interno al actualizar aprobación.