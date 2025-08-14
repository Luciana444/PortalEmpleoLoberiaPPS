📋 Tabla: visitas_portal

Descripción: Esta tabla registra las visitas al portal de empleo, incluyendo información sobre la página visitada, fecha, IP, agente de usuario y datos del usuario cuando está autenticado.

Campos y descripción

id (UUID): Identificador único de la visita. Se genera automáticamente con gen_random_uuid().

pagina (text): Nombre o URL de la página visitada. Obligatorio.

fecha (timestamp): Fecha y hora de la visita. Por defecto se asigna now().

ip (text): Dirección IP del visitante. Opcional.

user_agent (text): Información del navegador o dispositivo del visitante. Opcional.

tipo_usuario (text): Tipo de usuario que realizó la visita (ciudadano, empresa, admin). Opcional.

id_usuario (UUID): Identificador del usuario que realizó la visita, si estaba autenticado. Opcional.