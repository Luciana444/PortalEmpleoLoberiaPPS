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



## 🧩 ÉPICA 2: Creación y Gestión del Perfil del Usuario

**Objetivo:** Permitir que el usuario complete y actualice su perfil incluyendo datos personales, foto, formación y experiencia.

### 2.1 Completar CV en línea

**Como** usuario registrado, **quiero** completar mi CV en línea **para** mostrar mi perfil completo a empleadores.

**Actividades:**

- **Front:** Formulario con secciones y validaciones.
- **Back:** Endpoints para crear y actualizar datos del perfil.
- **Base de Datos:** Tablas `perfil_usuario`, `formacion_academica`, `experiencia_laboral`, `habilidades`.
- **Documentación:** Documentar estructura y endpoints.

**Criterios de Aceptación:**

- El formulario permite ingresar y guardar todos los datos requeridos.
- Los datos se almacenan correctamente y se pueden actualizar.
- Se muestran mensajes claros ante éxito o error.

### 2.2 Subir o importar CV en PDF

**Como** usuario registrado, **quiero** subir mi CV en PDF **para** que empleadores puedan descargarlo o verlo fácilmente.

**Actividades:**

- **Front:** Componente para subir archivos con validación.
- **Back:** Endpoint para recibir y almacenar archivo.
- **Base de Datos:** Tabla con referencia a archivos subidos.
- **Documentación:** Documentar endpoint de upload.

**Criterios de Aceptación:**

- El sistema acepta solo archivos PDF hasta tamaño definido.
- El archivo se almacena correctamente y se asocia al usuario.
- El usuario puede ver confirmación de subida exitosa.

### 2.3 Agregar o modificar foto de perfil

**Como** usuario registrado, **quiero** subir o cambiar mi foto de perfil **para** personalizar mi cuenta.

**Actividades:**

- **Front:** Selector de imagen con vista previa y validación.
- **Back:** Endpoint para subir y guardar foto.
- **Base de Datos:** Campo con referencia a la imagen.
- **Documentación:** Documentar endpoint y reglas de imagen.

**Criterios de Aceptación:**

- Se aceptan formatos válidos (.jpg, .png).
- La foto se actualiza y muestra correctamente.
- El usuario recibe confirmación tras subir la foto.

### 2.4 Editar perfil o CV posteriormente

**Como** usuario registrado, **quiero** modificar mi perfil o CV **para** mantener mi información actualizada.

**Actividades:**

- **Front:** Formulario pre-cargado con datos actuales para editar.
- **Back:** Endpoint para actualizar datos.
- **Base de Datos:** Actualización en tablas correspondientes.
- **Documentación:** Documentar endpoints de actualización.

**Criterios de Aceptación:**

- El usuario puede modificar cualquier dato de su perfil o CV.
- Los cambios se guardan correctamente.
- Se muestran mensajes claros sobre el resultado.

🧩 ÉPICA 3: Publicación y Gestión de Ofertas Laborales (Empresas)
Objetivo: Permitir que empleadores publiquen, editen o cancelen ofertas laborales.

3.1 Crear una nueva oferta laboral
Como empleador, quiero crear una oferta laboral para atraer candidatos adecuados.

Actividades:

Front: Formulario para crear oferta (título, puesto, ubicación, carga horaria, descripción, requisitos).
Back: Endpoint para recibir y validar datos de oferta.
Base de Datos: Tabla ofertas_laborales con campos relevantes.
Documentación: Documentar endpoint y campos requeridos.
Criterios de Aceptación:

Requiere todos los campos obligatorios.
La oferta se guarda y es visible.
Mensajes claros ante éxito o error.
3.2 Ver y listar mis ofertas publicadas
Como empleador, quiero ver mis ofertas para administrarlas.

Actividades:

Front: Vista lista con paginación y filtros.
Back: Endpoint para consultar por empleador.
Base de Datos: Consultas filtradas por id_empleador.
Documentación: Endpoint de listado.
Criterios de Aceptación:

Muestra solo ofertas propias.
Visualización clara y actualizada.
3.3 Editar una oferta existente
Como empleador, quiero modificar detalles de una oferta para mantenerla actualizada.

Actividades:

Front: Formulario precargado.
Back: Endpoint para actualizar.
Base de Datos: Actualizar en tabla ofertas.
Documentación: Endpoint de actualización.
Criterios de Aceptación:

Solo edita ofertas activas.
Cambios guardados y confirmación.
3.4 Cancelar o eliminar una oferta
Como empleador, quiero cancelar una oferta para dejar de recibir postulaciones.

Actividades:

Front: Botón de cancelar con confirmación.
Back: Endpoint para actualizar estado.
Base de Datos: Cambiar estado o eliminar.
Documentación: Documentar lógica.
Criterios de Aceptación:

Confirmación requerida.
No disponible para postulación tras cancelación.
3.5 Ver candidatos postulados a mi oferta
Como empleador, quiero ver postulantes para evaluarlos.

Actividades:

Front: Lista con info básica y enlace al CV.
Back: Endpoint por oferta.
Base de Datos: Join entre ofertas y postulaciones.
Documentación: Endpoint y estructura.
Criterios de Aceptación:

Solo ve postulantes propios.
Visualización clara y rápida.
🧩 ÉPICA 4: Visualización y Postulación a Ofertas (Ciudadanos)
Objetivo: Permitir a los ciudadanos buscar, filtrar y postularse a ofertas laborales.

4.1 Ver listado de ofertas laborales disponibles
Como ciudadano, quiero ver ofertas activas para encontrar trabajo.

Actividades:

Front: Lista con paginación.
Back: Endpoint de consulta.
Base de Datos: Filtro por estado.
Documentación: Endpoint.
Criterios de Aceptación:

Muestra solo ofertas activas.
Navegación rápida y clara.
4.2 Filtrar por palabra clave, ubicación, rubro
Como ciudadano, quiero filtrar ofertas para encontrar más rápido lo que busco.

Actividades:

Front: Filtros dinámicos.
Back: Endpoint con parámetros.
Base de Datos: Consultas condicionales.
Documentación: Parámetros y uso.
Criterios de Aceptación:

Filtros funcionan combinados.
Resultados relevantes.
4.3 Ver detalles de una oferta laboral
Como ciudadano, quiero ver info completa de una oferta para decidir si me postulo.

Actividades:

Front: Página con todos los datos.
Back: Endpoint por id.
Base de Datos: Consulta detallada.
Documentación: Endpoint.
Criterios de Aceptación:

Info completa sin datos sensibles.
Carga rápida.
4.4 Postularme a una oferta
Como ciudadano, quiero postularme para que mi perfil sea considerado.

Actividades:

Front: Botón y confirmación.
Back: Endpoint para crear postulación.
Base de Datos: Tabla postulaciones.
Documentación: Endpoint.
4.5 Ver a qué ofertas me postulé
Como ciudadano, quiero ver mis postulaciones para hacer seguimiento.

Actividades:

Front: Lista con estado.
Back: Endpoint por usuario.
Base de Datos: Join entre tablas.
Documentación: Endpoint.
Criterios de Aceptación:

Muestra solo propias.
Info clara y actualizada.
🧩 ÉPICA 5: Integración con Capacitaciones del Ministerio
Objetivo: Mostrar acceso a capacitaciones externas.

5.1 Mostrar botón o sección con acceso a capacitaciones
Como usuario, quiero ver acceso a capacitaciones para aprovechar recursos formativos.

5.2 Redirigir a portal externo de capacitaciones
Como usuario, quiero ser redirigido al portal externo para acceder al contenido.

Actividades:

Front: Link con URL externa.
Back: No aplica.
Base de Datos: Configuración URL.
Documentación: Comportamiento.
Criterios de Aceptación:

Redirección correcta.
Actualización dinámica.
🧩 ÉPICA 6: Cancelación y Modificación de Ofertas y CV
Objetivo: Permitir que usuarios editen o cancelen publicaciones y actualicen CV.

6.1 Cancelar o editar una oferta activa
Como empleador, quiero modificar o cancelar ofertas para mantener la información actualizada.

6.2 Actualizar CV o perfil
Como ciudadano, quiero modificar mi CV o perfil para mantenerlo al día.

6.3 No editar ofertas vencidas
Como sistema, quiero impedir edición de ofertas vencidas para mantener integridad.

6.4 Confirmar antes de cancelar o borrar publicación
Como usuario, quiero recibir confirmación para evitar acciones accidentales.

🧩 ÉPICA 7: Análisis y Reportes
Objetivo: Proveer métricas e informes útiles al equipo o autoridades.

7.1 Reporte de usuarios registrados
Como admin, quiero ver usuarios por tipo para analizar la base.

7.2 Métricas de visitas
Como admin, quiero ver visitas al portal para mejorar.

7.3 Ofertas por empresa
Como admin, quiero ver ofertas por empresa para monitorear.

7.4 Postulaciones y vinculaciones
Como admin, quiero ver datos de postulaciones para evaluar eficacia.

7.5 Exportar reportes
Como admin, quiero exportar reportes en PDF o Excel para compartirlos.

🧩 ÉPICA 8: Accesibilidad desde Dispositivos Móviles
Objetivo: Asegurar el uso cómodo del portal en móviles.

8.1 Interfaz responsive
Como usuario móvil, quiero que la UI se adapte para navegar cómodamente.

8.2 Testeo en móviles
Como QA, quiero validar experiencia en dispositivos para asegurar calidad.

8.3 Formularios y botones usables
Como usuario móvil, quiero que formularios y botones sean cómodos para evitar errores.

