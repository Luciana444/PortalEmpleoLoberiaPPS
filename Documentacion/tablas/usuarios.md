📋 Tabla: usuarios

Descripción: Esta tabla almacena los usuarios registrados en el sistema, incluyendo ciudadanos, empresas y administradores. Contiene información básica de autenticación y control de estado.

Campos y descripción

id (UUID): Identificador único del usuario. Se genera automáticamente con gen_random_uuid().

nombre (text): Nombre completo del usuario. Obligatorio.

email (text): Correo electrónico del usuario. Obligatorio y único.

contrasena (text): Contraseña cifrada del usuario. Obligatorio.

tipo_usuario (text): Tipo de usuario. Valores posibles: ciudadano, empresa, admin. Obligatorio.

fecha_registro (timestamp): Fecha y hora de registro del usuario. Se asigna automáticamente con now().

estado (boolean): Indica si el usuario está activo (true) o inactivo (false). Por defecto es true.