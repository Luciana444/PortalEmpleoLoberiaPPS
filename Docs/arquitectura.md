## 🔧 Arquitectura del sistema

El sistema del Portal de Empleo Lobería se basa en una arquitectura desacoplada de tipo **cliente-servidor**, con un frontend en Angular, un backend en Node.js (Express) y una base de datos PostgreSQL gestionada mediante Supabase como Backend-as-a-Service (BaaS).

---

### 📐 Diagrama general de arquitectura

```plaintext
┌────────────────────┐
│     Usuario        │
│  (Navegador Web)   │
└────────┬───────────┘
         │
         ▼
┌──────────────────────────────┐
│       Frontend (Angular)     │
│ UI, Servicios HTTP, Routing  │
└────────┬─────────────────────┘
         │ REST API Calls
         ▼
┌──────────────────────────────┐
│       Backend (Node.js)      │
│ Express.js - API REST        │
│ Validaciones, lógica de negocio │
└────────┬─────────────────────┘
         │ SQL Queries / Supabase SDK
         ▼
┌──────────────────────────────┐
│ Base de Datos (PostgreSQL)   │
│ Supabase - Seguridad RLS, Auth │
│ Tablas: usuarios, ofertas, etc. │
└──────────────────────────────┘


🧩 Descripción de componentes
🧠 Frontend (Angular)
SPA construida en Angular.

Usa servicios (HttpClient) para consumir la API REST.

Maneja rutas, formularios, validaciones y visualización de datos.

Interfaz adaptada para ciudadanos, empresas y admins.

🛠️ Backend (Node.js con Express)
Define endpoints RESTful para acceder a datos (ofertas, usuarios, postulaciones).

Se comunica con Supabase usando el SDK oficial (@supabase/supabase-js).

Implementa lógica de negocio: validaciones, transformaciones de datos, control de acceso.

🗄️ Base de datos (PostgreSQL vía Supabase)
Base de datos relacional alojada en Supabase.

Tablas relacionales normalizadas: usuarios, ofertas_laborales, postulaciones, empresas, etc.

Reglas de seguridad implementadas mediante RLS (Row-Level Security).

Funciones y vistas creadas directamente en SQL (si aplica).

🔐 Autenticación y autorización
Gestión de usuarios implementada con el sistema de auth de Supabase.

Soporte para registro con email y contraseña.

Uso de JWT para validar el acceso en el backend (a través de middleware).

💡 Justificación de decisiones tecnológicas
Tecnología	¿Por qué se eligió?
Angular	Framework robusto para SPAs, estructurado, con TypeScript y buenas prácticas de escalabilidad. Ideal para equipos con roles definidos.
Node.js + Express	Backend liviano, rápido y popular, con gran ecosistema. Permite estructurar una API REST clara y mantenible.
PostgreSQL (Supabase)	Motor SQL potente, gratuito, ideal para relaciones complejas. Supabase aporta un panel visual, autenticación integrada y funciones serverless.
Supabase SDK	Facilita la conexión directa a la base con control de seguridad. Reduce el tiempo de desarrollo en comparación con ORM manual.
GitHub	Control de versiones colaborativo, ideal para equipos. Facilita integraciones con CI/CD.
Notion / Markdown	Documentación clara y accesible para todo el equipo, tanto técnica como funcional.

⚙️ Esta arquitectura es modular, escalable y mantenible, y permite agregar fácilmente nuevas funcionalidades como notificaciones, filtros, dashboards o incluso una app móvil en el futuro.