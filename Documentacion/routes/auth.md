📘 Rutas: Autenticación
Este módulo maneja las rutas relacionadas con la autenticación de usuarios.
Incluye:

Registro de usuario
Inicio de sesión
Envío de token de recuperación de contraseña
Restablecimiento de contraseña
🔐 POST /auth/register
Descripción: Registra un nuevo usuario (ciudadano o empresa).
Requiere autenticación: ❌ No

📤 Body esperado:
{
  "nombre": "string (obligatorio)",
  "email": "string (obligatorio, debe ser único)",
  "contrasena": "string (obligatorio)",
  "tipo_usuario": "string (obligatorio, valores: 'ciudadano' o 'empresa')"
}
📥 Posibles respuestas:
201 Created: Usuario registrado correctamente.
400 Bad Request: Datos inválidos o usuario ya existe.
🔐 POST /auth/login
Descripción: Inicia sesión con email y contraseña.
Requiere autenticación: ❌ No

📤 Body esperado:
{
  "email": "string (obligatorio)",
  "contrasena": "string (obligatorio)"
}
📥 Posibles respuestas:
200 OK: Devuelve token de autenticación.
401 Unauthorized: Credenciales inválidas.
🔐 POST /auth/recover/password
Descripción: Envía token de recuperación de contraseña al email del usuario.
Requiere autenticación: ❌ No

📤 Body esperado:
{
  "email": "string (obligatorio)"
}
📥 Posibles respuestas:
200 OK: Token enviado correctamente.
404 Not Found: Email no registrado.
🔐 POST /auth/reset/password
Descripción: Restablece la contraseña usando el token de recuperación.
Requiere autenticación: ❌ No

📤 Body esperado:
{
  "token": "string (obligatorio)",
  "nueva_contrasena": "string (obligatorio)"
}
📥 Posibles respuestas:
200 OK: Contraseña actualizada correctamente.
400 Bad Request: Token inválido o datos incorrectos.
📌 Nota: Todas las rutas de autenticación están definidas en authRoutes.js y documentadas también en Swagger bajo la categoría Autenticación.