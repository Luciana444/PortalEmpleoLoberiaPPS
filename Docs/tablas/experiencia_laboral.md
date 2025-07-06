# 📋 Tabla: experiencias_laborales_ciudadanos

Esta tabla almacena las experiencias laborales que los ciudadanos pueden registrar en su perfil.

---

## Campos y descripción

- **id (UUID):** Identificador único de la experiencia laboral.  
- **id_ciudadano (UUID):** Referencia al ciudadano dueño de la experiencia (clave foránea).  
- **nombre_empresa (text):** Nombre o descripción de la empresa donde trabajó.  
- **desde (date):** Fecha de inicio de la experiencia laboral.  
- **hasta (date, nullable):** Fecha de finalización; puede estar vacía si la experiencia sigue vigente.  
- **comentario (text, nullable):** Texto opcional para que el ciudadano relate detalles del trabajo.
