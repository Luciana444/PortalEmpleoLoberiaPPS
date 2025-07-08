# 📋 Tabla: postulaciones

Esta tabla registra las postulaciones que realizan los ciudadanos a las ofertas laborales publicadas por las empresas.

---

## Campos y descripción

- **id (UUID):** Identificador único de la postulación. Clave primaria generada automáticamente.  
- **id_ciudadano (UUID):** Referencia al ciudadano que se postula. Clave foránea a `perfiles_ciudadanos`.  
- **id_oferta (UUID):** Referencia a la oferta laboral a la que se postula. Clave foránea a `ofertas_laborales`.  
- **fecha_postulacion (timestamp):** Fecha y hora en que se realizó la postulación. Valor por defecto: `now()`.  
- **mensaje (text):** Mensaje personalizado opcional que acompaña la postulación.  
- **cv_url (text):** URL del CV personalizado adjunto. (opcional)  

---

## 🛡️ Campos internos (no visibles al público)

- **estado (text):** Estado de la postulación: `pendiente`, `aceptado` o `rechazado`.  
- **leido_por_empresa (boolean):** Indica si la empresa ya visualizó la postulación. Valor por defecto: `false`.
