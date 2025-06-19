## 📘 Diccionario de Datos

### Tabla: usuarios
| Campo           | Tipo       | Descripción                               |
|------------------|------------|-------------------------------------------|
| id               | UUID       | Identificador único (PK)                  |
| nombre           | TEXT       | Nombre completo                          |
| email            | TEXT       | Correo electrónico único                 |
| contrasena       | TEXT       | Contraseña en texto plano o hash         |
| tipo_usuario     | TEXT       | ciudadano, empresa, admin                |
| fecha_registro   | TIMESTAMP  | Fecha de creación del usuario            |
| estado           | BOOLEAN    | Activo o inactivo                        |

---

### Tabla: empresas
| Campo         | Tipo  | Descripción                                  |
|---------------|--------|----------------------------------------------|
| id            | UUID   | ID único de la empresa                      |
| id_usuario    | UUID   | FK a `usuarios(id)`                          |
| nombre_empresa| TEXT   | Nombre comercial                            |
| direccion     | TEXT   | Dirección física                             |
| telefono      | TEXT   | Teléfono                                     |
| sitio_web     | TEXT   | URL de sitio web                             |

---

### Tabla: perfiles_usuarios
| Campo            | Tipo  | Descripción                              |
|------------------|--------|------------------------------------------|
| id               | UUID   | ID único del perfil                      |
| id_usuario       | UUID   | FK a `usuarios(id)`                      |
| fecha_nacimiento | DATE   | Fecha de nacimiento                      |
| telefono         | TEXT   | Teléfono personal                        |
| educacion        | TEXT   | Estudios realizados                      |
| experiencia      | TEXT   | Experiencia laboral                      |
| habilidades      | TEXT   | Lista de habilidades                     |
| cv_url           | TEXT   | Enlace a CV cargado                      |
| imagen_url       | TEXT   | Enlace a imagen de perfil                |

---

### Tabla: ofertas_laborales
| Campo             | Tipo       | Descripción                            |
|-------------------|------------|----------------------------------------|
| id                | UUID       | ID único de la oferta                  |
| id_empresa        | UUID       | FK a `empresas(id)`                    |
| titulo            | TEXT       | Título de la oferta                    |
| descripcion       | TEXT       | Descripción detallada                  |
| requisitos        | TEXT       | Requisitos deseados                    |
| ubicacion         | TEXT       | Ciudad o zona                          |
| modalidad         | TEXT       | presencial, remoto, hibrido            |
| tipo_contrato     | TEXT       | Tipo de contratación                   |
| fecha_publicacion | TIMESTAMP  | Fecha en que se publicó                |
| fecha_cierre      | DATE       | Fecha de cierre                        |
| estado            | TEXT       | activa, cerrada, pausada               |

---

### Tabla: postulaciones
| Campo             | Tipo       | Descripción                            |
|-------------------|------------|----------------------------------------|
| id                | UUID       | ID único de la postulación             |
| id_usuario        | UUID       | FK a `usuarios(id)`                    |
| id_oferta         | UUID       | FK a `ofertas_laborales(id)`          |
| fecha_postulacion | TIMESTAMP  | Fecha en que se postuló                |
| mensaje           | TEXT       | Mensaje opcional del postulante        |
| cv_url            | TEXT       | Enlace al CV actualizado               |
| estado            | TEXT       | pendiente, aceptado, rechazado         |

---

## 🔐 Reglas de Validación

- `email`, `id_usuario` (en tablas 1:1) y `(id_usuario, id_oferta)` son únicos.
- `tipo_usuario`, `modalidad` y `estado` tienen valores restringidos con `CHECK`.
- Claves foráneas con `ON DELETE CASCADE` para mantener integridad referencial.
- Valores por defecto definidos para `estado`, `fecha_postulacion`, `fecha_registro`.

