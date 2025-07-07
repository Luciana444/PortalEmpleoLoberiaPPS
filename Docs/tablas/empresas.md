# 📋 Tabla: empresas

Esta tabla almacena la información de las empresas registradas en el portal.  
Incluye datos públicos de contacto y algunos campos internos de administración.

---

## Campos y descripción

- **id (UUID):** Identificador único de la empresa. Clave primaria generada automáticamente.  
- **id_usuario (UUID):** Referencia al usuario propietario. Único, clave foránea a `usuarios(id)`.  
- **nombre_empresa (text):** Nombre legal de la empresa. (obligatorio)  
- **email_contacto (text):** Email de contacto visible. (obligatorio)  
- **logo (text):** URL de la imagen del logo. (opcional)  
- **sitio_web (text):** URL del sitio web. (opcional)  
- **cuit (text):** Número de CUIT de la empresa. (obligatorio)  
- **rubro (text):** Sector o actividad principal de la empresa. (opcional)  
- **telefono (text):** Teléfono de contacto. (opcional)  
- **calle (text):** Nombre de la calle. (obligatorio)  
- **numero (text):** Número del domicilio. (obligatorio)  
- **piso (text):** Piso. (opcional)  
- **dpto (text):** Departamento. (opcional)  
- **localidad (text):** Localidad o ciudad. (obligatorio)  
- **provincia (text):** Provincia. (obligatorio)  
- **pais (text):** País. (obligatorio)  

### 🛡️ Campos internos (no visibles al público)

- **estado_aprobacion (text):** Estado del registro: `pendiente` (por defecto), `aprobada` o `rechazada`.  
- **fecha_aprobacion (date):** Fecha en que fue aprobada o rechazada. (opcional)  
- **email_admin_autorizador (text):** Email del administrador que aprobó o rechazó. (opcional)  
