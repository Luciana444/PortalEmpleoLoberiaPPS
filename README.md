# 📌 Portal de Empleo Lobería

Plataforma web desarrollada como parte de una pasantía académica, con el objetivo de conectar ciudadanos en búsqueda de empleo con empresas locales, bajo la supervisión y colaboración del Municipio de Lobería.

---

## 🧭 Introducción

El **Portal de Empleo Lobería** es una solución digital para la gestión de ofertas laborales locales. Permite a los ciudadanos crear y mantener su currículum en línea, y a las empresas publicar sus búsquedas de personal, todo dentro de un entorno administrado por el municipio.

---

## 🎯 Objetivo general

Crear un sistema de intermediación laboral que facilite la conexión entre la oferta y demanda de trabajo en el partido de Lobería, promoviendo la empleabilidad mediante una herramienta digital accesible, moderna y segura.

---

## 👥 Público objetivo

- Ciudadanos en búsqueda activa de empleo.
- Empresas locales que ofrecen puestos laborales.
- Personal del municipio encargado de gestionar el portal.

---

## 🧰 Tecnologías utilizadas

- **Frontend:** Angular
- **Backend:** Node.js con Express
- **Base de Datos:** PostgreSQL (gestionada desde Supabase)
- **Cliente de base de datos / ORM:** Supabase-js
- **Control de versiones:** Git + GitHub
- **Herramientas de documentación:** Notion, Markdown
- **Otras herramientas:** Trello, dbdiagram.io, Figma .

---

## 📦 Alcance funcional

### ✔️ Funcionalidades incluidas:
- Registro y autenticación de usuarios (ciudadanos y empresas).
- Creación de currículum vitae en línea.
- Publicación de ofertas laborales por parte de empresas.
- Postulación a empleos por parte de ciudadanos.
- Panel de administración municipal para gestión de usuarios y ofertas.

### ❌ Exclusiones (fuera del alcance actual):
- Chat en tiempo real entre usuarios.
- Procesos de selección internos (entrevista, contratación).
- Estadísticas avanzadas o paneles analíticos.
- Integración con servicios de pago.

---

## 👨‍💻 Equipo de trabajo

- Luciana Zabaleta  
- Gisele Bartolo  
- Santiago Lázaro  
- Nahuel Caroseli  
- Analia Burgos  

---

# 📐 Diseño del Portal de Empleo

Para ver el diseño completo e interactivo:  
[🔗 Ver diseño en Figma]()

---

## 📝 Registro de Usuario
Capturas de las diferentes pantallas y tipos de registro.

<table>
  <tr>
    <td><img src="ImagenesFigma/registro/Form%20registro.jpg" width="250"><br>Formulario de registro general.</td>
    <td><img src="ImagenesFigma/registro/Form%20registro%20postulanteMobile.jpg" width="250"><br>Registro de postulante en vista móvil.</td>
    <td><img src="ImagenesFigma/registro/Login%20Mobile.jpg" width="250"><br>Pantalla de inicio de sesión en móvil.</td>
  </tr>
  <tr>
    <td><img src="ImagenesFigma/registro/Login.jpg" width="250"><br>Pantalla de inicio de sesión en escritorio.</td>
    <td><img src="ImagenesFigma/registro/Perfil%20Postulante.jpg" width="250"><br>Perfil del postulante en vista general.</td>
    <td><img src="ImagenesFigma/registro/Perfil%20Postulante-%20Vista%20edición.jpg" width="250"><br>Edición del perfil del postulante.</td>
  </tr>
  <tr>
    <td><img src="ImagenesFigma/registro/Postulante%20mobile.jpg" width="250"><br>Vista del perfil del postulante en móvil.</td>
    <td><img src="ImagenesFigma/registro/Recuperación%20Mobile.jpg" width="250"><br>Pantalla de recuperación de contraseña en móvil.</td>
    <td><img src="ImagenesFigma/registro/Recuperación%20contrasena.jpg" width="250"><br>Pantalla de recuperación de contraseña en escritorio.</td>
  </tr>
</table>

---

## 🔍 Ofertas Laborales
Ejemplos de vistas de ofertas en distintas resoluciones y modos.

<table>
  <tr>
    <td><img src="ImagenesFigma/ofertas/Detalle%20oferta.jpg" width="250"><br>Detalle de oferta en escritorio.</td>
    <td><img src="ImagenesFigma/ofertas/Detalle%20oferta%20mobile.jpg" width="250"><br>Detalle de oferta en móvil.</td>
    <td><img src="ImagenesFigma/ofertas/Detalle%20oferta-%20Edición%20empleador.jpg" width="250"><br>Edición de oferta por el empleador.</td>
  </tr>
  <tr>
    <td><img src="ImagenesFigma/ofertas/Landing%20Ofertas%20mobile.jpg" width="250"><br>Página principal de ofertas en móvil.</td>
    <td><img src="ImagenesFigma/ofertas/Landing%20Ofertas%20mobile.jpg" width="250"><br>Otra vista móvil de ofertas (duplicada).</td>
    <td><img src="ImagenesFigma/ofertas/Landing%20Ofertas-%20Logueado.jpg" width="250"><br>Vista de ofertas con usuario logueado.</td>
  </tr>
  <tr>
    <td><img src="ImagenesFigma/ofertas/Landing%20Ofertas.jpg" width="250"><br>Vista general de ofertas en escritorio.</td>
  </tr>
</table>

---

## 👔 Perfil Empleador
Pantallas relacionadas con la administración y vista del perfil de un empleador.

<table>
  <tr>
    <td><img src="ImagenesFigma/empleador/Empleador%20mobile.jpg" width="250"><br>Perfil del empleador en móvil.</td>
    <td><img src="ImagenesFigma/empleador/Perfil%20Empleador-%20Vista%20aprobación.jpg" width="250"><br>Vista de aprobación del perfil.</td>
    <td><img src="ImagenesFigma/empleador/Perfil%20Empleador-%20Vista%20edición.jpg" width="250"><br>Edición del perfil del empleador.</td>
  </tr>
</table>

---

## 🛠️ Panel de Administración
Vista del panel de reportes para el administrador.

<img src="ImagenesFigma/admin/Reportes.jpg" width="400"><br>Pantalla de reportes en el panel de administración.




## 📚 Documentación del Backend (JSDoc)

Este proyecto incluye documentación generada automáticamente con [JSDoc](https://jsdoc.app/) para los controladores y servicios del backend.

### 📄 Ver documentación

La documentación está disponible en: Backend/docs/index.html

### 🔍 ¿Cómo visualizarla?

1. Abrir el proyecto en Visual Studio Code.
2. Navegar hasta `Backend/docs/index.html`.
3. Hacer clic derecho sobre el archivo y elegir **"Open with Live Server"**.
   > O abrir directamente en el navegador con doble clic.

> ⚠️ Este archivo **no es la interfaz del sistema**, sino la **documentación técnica** del código backend generada automáticamente por JSDoc.

---


> 📝 **Nota:** Este documento forma parte de un proyecto académico de formación en desarrollo de software y tiene fines educativos.

---


## Tecnologías utilizadas

- Node.js (Backend REST API)  
- Angular (Frontend)  
- Supabase (Base de datos y autenticación)  
- Git (control de versiones)

---

## Instalación y ejecución local

### Requisitos previos

- Node.js (v16+) instalado  
- Angular CLI instalado (`npm install -g @angular/cli`)  
- Cuenta y proyecto configurado en Supabase  

### Pasos para ejecutar

1. Clonar el repositorio  
   ```bash
   git clone https://github.com/Lusiana444/PortalEmpleoLoberiaPPS.git
   cd PortalEmpleoLoberiaPPS

