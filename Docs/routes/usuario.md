# 📘 Rutas: Usuarios

Este módulo maneja las rutas relacionadas con la gestión de usuarios.  
Incluye la obtención de usuarios y subida de fotos de perfil.

---

## 🔍 GET `/usuario/`

**Descripción:** Obtiene la lista de todos los usuarios registrados.  
**Requiere autenticación:** ❌ No (según el código actual)  

### 📥 Respuesta exitosa (200):

```json
[
  {
    "id": "string (uuid)",
    "nombre": "string",
    "email": "string (email)"
  }
]


📸 POST /usuario/foto/perfil
Descripción: Permite subir la foto de perfil del usuario autenticado.
Requiere autenticación: ✅ Sí (token Bearer)

📤 Body esperado (form-data):
Campo	Tipo	Descripción
foto	file	Archivo de imagen a subir
tipoUsuario	string	Tipo de usuario, ej. "ciudadano"

📥 Posibles respuestas:
200 OK: Foto subida exitosamente.

400 Bad Request: Error al subir la foto.

401 Unauthorized: Usuario no autenticado.

🚧 Endpoints futuros / en desarrollo
 Agregar endpoint para actualizar datos del usuario.

 Agregar endpoint para eliminar usuario.

 Documentar validaciones y errores específicos.

📌 Nota: Todas las rutas están definidas en usuarioRoutes.js y también documentadas en Swagger bajo la categoría Usuarios.
