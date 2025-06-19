## 🧩 ÉPICA 1: Registro y Autenticación de Usuarios

**Objetivo:** Permitir que ciudadanos y empleadores se registren, inicien sesión y gestionen su cuenta de forma segura.

### 1.1 Registro de Ciudadano o Empleador

**Como** ciudadano o empleador, **quiero** registrarme en el portal **para** poder acceder y utilizar sus servicios.

**Actividades:**

- **Front:** Formulario con campos (nombre, email, contraseña, tipo de usuario), validaciones y mensajes.
- **Back:** Endpoint que reciba datos, valide, hashee contraseña y guarde usuario.
- **Base de Datos:** Tabla `usuarios` con campos: id, nombre, email, contraseña, tipo_usuario, fecha_registro, estado.
- **Documentación:** Documentar endpoint y reglas de validación.

**Criterios de Aceptación:**

- El formulario requiere todos los campos obligatorios.
- El sistema no permite registrar un email duplicado.
- La contraseña queda guardada de forma segura (hasheada).
- El usuario recibe confirmación de registro exitoso o error.

### 1.2 Inicio de Sesión

**Como** usuario registrado, **quiero** iniciar sesión **para** acceder a mi cuenta y funcionalidades personalizadas.

**Actividades:**

- **Front:** Formulario login con validación.
- **Back:** Endpoint para validar credenciales, generar token o sesión.
- **Base de Datos:** Validar datos en tabla `usuarios`.
- **Documentación:** Documentar endpoint login y token.

**Criterios de Aceptación:**

- Se validan email y contraseña.
- Usuario recibe token válido si las credenciales son correctas.
- En caso de error, muestra mensaje claro (usuario o contraseña incorrectos).

### 1.3 Cierre de Sesión

**Como** usuario autenticado, **quiero** cerrar sesión **para** proteger mi cuenta cuando termino de usarla.

**Actividades:**

- **Front:** Botón logout que elimina token o sesión local.
- **Back:** Endpoint para invalidar sesión/token.
- **Base de Datos:** Actualizar estado sesión si aplica.
- **Documentación:** Documentar endpoint logout.

**Criterios de Aceptación:**

- Al cerrar sesión, el token queda invalidado.
- El usuario es redirigido a la página de login.
- No se puede acceder a páginas protegidas sin sesión activa.

### 1.4 Recuperación de Contraseña

**Como** usuario que olvidó su contraseña, **quiero** solicitar recuperación **para** volver a acceder a mi cuenta.

**Actividades:**

- **Front:** Formulario para ingresar email y solicitar recuperación.
- **Back:** Endpoint para generar token temporal y enviar email.
- **Base de Datos:** Tabla `tokens_recuperacion` con fecha de expiración.
- **Documentación:** Documentar flujo y endpoints.

**Criterios de Aceptación:**

- Usuario puede solicitar recuperación con email registrado.
- Recibe email con link seguro para restablecer contraseña.
- El token expira tras un tiempo definido.
- Nueva contraseña se actualiza correctamente.

### 1.5 Validación de Sesión Activa

**Como** usuario autenticado, **quiero** que el sistema valide mi sesión en cada acción **para** proteger mis datos y mantener seguridad.

**Actividades:**

- **Front:** Middleware o lógica para validar token en páginas protegidas.
- **Back:** Middleware para validar token/sesión en endpoints protegidos.
- **Base de Datos:** Validar estado sesión/token si necesario.
- **Documentación:** Documentar flujo y expiración de sesión.

**Criterios de Aceptación:**

- El sistema bloquea acceso a usuarios no autenticados.
- Las sesiones expiran tras tiempo inactivo definido.
- El usuario es redirigido a login si la sesión no es válida.
