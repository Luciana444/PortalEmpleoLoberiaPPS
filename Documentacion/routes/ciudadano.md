# 📘 Rutas: Ciudadano

Este módulo maneja las rutas relacionadas con la gestión del perfil y CV del ciudadano.  
Incluye subir CV, actualizar perfil y generar PDF del CV.

---

## 📤 PUT `/ciudadano/importar_cv`

**Descripción:** Permite subir un archivo CV (PDF) al perfil del ciudadano autenticado.  
**Requiere autenticación:** ✅ Sí (token Bearer)  
**Requiere rol:** Ciudadano

### 📤 Body esperado (form-data):

| Campo | Tipo   | Descripción                  |
|-------|--------|------------------------------|
| cv    | file   | Archivo PDF con el CV        |

### 📥 Posibles respuestas:

- `200 OK`: CV subido correctamente.
- `400 Bad Request`: Falta el archivo CV.
- `403 Forbidden`: No autorizado para realizar esta acción.
- `500 Internal Server Error`: Error interno al subir el CV.

---

## 📝 PATCH `/ciudadano/actualizar/perfil`

**Descripción:** Actualiza los datos del perfil del ciudadano autenticado.  
**Requiere autenticación:** ✅ Sí (token Bearer)  
**Requiere rol:** Ciudadano

### 📤 Body esperado (JSON):

```json
{
  "nombre": "string",
  "apellido": "string",
  "fecha_nacimiento": "string (formato fecha)",
  "telefono": "string",
  "email": "string",
  "dni": "string",
  "cuil": "string",
  "calle": "string",
  "numero": "string",
  "piso": "string",
  "dpto": "string",
  "localidad": "string",
  "provincia": "string",
  "pais": "string",
  "nivel_educativo": "string",
  "esta_cursando_carrera": "boolean",
  "carrera_en_curso": "string",
  "situacion_laboral": "string",
  "tiene_emprendimiento": "string",
  "discapacidad": "string",
  "cv_url": "string"
}

📥 Posibles respuestas:
200 OK: Perfil actualizado correctamente.

400 Bad Request: Datos inválidos o campos faltantes.

500 Internal Server Error: Error interno al actualizar el perfil.

📄 GET /ciudadano/generar_cv
Descripción: Genera y devuelve el CV del ciudadano autenticado en formato PDF.
Requiere autenticación: ✅ Sí (token Bearer)
Requiere rol: Ciudadano

📥 Posibles respuestas:
200 OK: PDF generado correctamente (contenido PDF en la respuesta).

404 Not Found: No se encontró el ID del usuario autenticado.

500 Internal Server Error: Error interno al generar el PDF.

📌 Nota: Todas las rutas están definidas en ciudadanoRoutes.js y documentadas en Swagger bajo la categoría Ciudadano.
