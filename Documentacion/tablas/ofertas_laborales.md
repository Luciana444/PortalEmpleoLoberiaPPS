# 📋 Tabla: ofertas_laborales

Esta tabla almacena las ofertas de empleo publicadas por las empresas dentro del portal.

---

## Campos y descripción

- **id (UUID):** Identificador único de la oferta laboral. Clave primaria generada automáticamente.  
- **id_empresa (UUID):** Referencia a la empresa que publica la oferta. Clave foránea.  
- **puesto_requerido (text):** Nombre del puesto o cargo solicitado. (obligatorio)  
- **descripcion (text):** Descripción detallada del puesto.  
- **nivel_educativo_requerido (text):** Nivel educativo mínimo requerido.  
  - primario completo  
  - secundario completo  
  - universitario  
  - no requiere  
- **experiencia_requerida (text):** Años o tipo de experiencia solicitada. (opcional)  
- **otros_requisitos (text):** Requisitos adicionales específicos. (opcional)  
- **lugar_trabajo (text):** Modalidad física del puesto.  
  - presencial  
  - remoto  
  - mixto  
- **modalidad (text):** Tipo de jornada laboral.  
  - tiempo completo  
  - medio tiempo  
  - otro  
- **tipo_contrato (text):** Detalle específico del contrato. (opcional)  
- **localidad (text):** Localidad donde se desarrollará el trabajo. (visible al público)  

---

## 🛡️ Campos internos (no visibles al público)

- **fecha_publicacion (date):** Fecha de publicación de la oferta. Valor por defecto: `now()`.  
- **fecha_cierre (date):** Fecha límite para postularse a la oferta.  
- **estado (text):** Estado actual de la oferta: `activa`, `cerrada`, `pausada`. Valor por defecto: `activa`.  
- **estado_publicacion (text):** Estado de revisión de la publicación: `pendiente`, `aprobada`, `rechazada`.  
- **fecha_aprobacion (date):** Fecha en que fue aprobada o rechazada la**_**
