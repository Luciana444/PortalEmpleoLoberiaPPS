# 🔐 Seguridad de Acceso a la Base de Datos – Portal de Empleo

## 📌 Contexto

Durante el desarrollo del Portal de Empleo del Municipio de Lobería, se utilizó **Supabase** como plataforma temporal para alojar la base de datos PostgreSQL, con el objetivo de facilitar la colaboración del equipo y agilizar los primeros prototipos.

## 🔒 Acceso y seguridad

- El acceso a la base de datos **no se realiza desde el frontend**, sino exclusivamente desde el **backend desarrollado en Node.js**.
- El backend implementa un sistema de **autenticación propio basado en JWT (JSON Web Token)**.
- Todas las rutas protegidas del backend requieren un token válido para poder consultar, insertar o modificar datos.
- El backend se conecta a Supabase utilizando la clave `service_role`, que **nunca se expone al cliente**.

## ⚠️ Sobre RLS (Row Level Security)

- Supabase advierte que no se ha habilitado RLS (Row Level Security) en las tablas del esquema público.
- No se activó RLS porque:
  - El acceso está controlado 100% desde el backend.
  - No se expone Supabase directamente a ningún cliente o navegador.
  - La base de datos será **migrada en producción a un servidor PostgreSQL del municipio**, que **no utilizará Supabase ni RLS**.
  - Implementar RLS con JWT implicaría una configuración avanzada innecesaria para este entorno temporal.

## 🚀 Migración a producción

- Una vez migrado el sistema al servidor del municipio:
  - El backend seguirá siendo el responsable de validar tokens y controlar permisos.
  - La seguridad se gestionará a través de roles de PostgreSQL y el control de acceso de la aplicación backend.

---

**Responsable del backend**: Equipo de desarrollo de la pasantía (TUDAI - UNICEN)  
**Base temporal**: Supabase (PostgreSQL)  
**Base definitiva**: Servidor PostgreSQL del Municipio de Lobería
