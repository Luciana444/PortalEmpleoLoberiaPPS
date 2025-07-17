import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { onlyEmpresa } from '../middlewares/onlyEmpresa.js';
import { actualizarPerfilEmpresa, crearOfertaLaboral, obtenerDatosEmpresa,obtenerOfertasEmpresa,traerOfertasActivas,eliminarOfertaEmpresa, editarOfertaLaboral,obtenerNotificaciones } from '../controllers/empleadorController.js';

export const empleadorRoutes = express.Router();

//=======================================================================================
//End point para actualizar perfil  de la empresa
//  (si es la primera vez sobreescribe los valores  que fueron creados al iniciar sesion como usuario)
//===========================================================================================
/**
 * @swagger
 * /empresa/actualizar/perfil:
 *   patch:
 *     summary: Actualiza el perfil de una empresa
 *     tags: [Empleador]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_empresa:
 *                 type: string
 *               email_contacto:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: uri
 *               sitio_web:
 *                 type: string
 *                 format: uri
 *               cuit:
 *                 type: string
 *               rubro:
 *                 type: string
 *               telefono:
 *                 type: string
 *               calle:
 *                 type: string
 *               numero:
 *                 type: string
 *               piso:
 *                 type: string
 *               dpto:
 *                 type: string
 *               localidad:
 *                 type: string
 *               provincia:
 *                 type: string
 *               pais:
 *                 type: string
 *             example:
 *               nombre_empresa: "Tech Solutions SRL"
 *               email_contacto: "contacto@tech.com"
 *               logo: "https://example.com/logo.png"
 *               sitio_web: "https://techsolutions.com"
 *               cuit: "30712345678"
 *               rubro: "Desarrollo de software"
 *               telefono: "123456789"
 *               calle: "Av. Siempre Viva"
 *               numero: "742"
 *               piso: "1"
 *               dpto: "B"
 *               localidad: "Springfield"
 *               provincia: "Buenos Aires"
 *               pais: "Argentina"
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */

empleadorRoutes.patch('/actualizar/perfil',authMiddleware,onlyEmpresa,actualizarPerfilEmpresa);


//==============================================================================
// End point para obtener datos de la empresa
//=============================================================================

/**
 * @swagger
 * /empresa/datos:
 *   get:
 *     summary: Obtiene los datos del perfil de la empresa autenticada
 *     tags: [Empleador]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de la empresa obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: string
 *                 nombre_empresa:
 *                   type: string
 *                 email_contacto:
 *                   type: string
 *                 logo:
 *                   type: string
 *                   format: uri
 *                 sitio_web:
 *                   type: string
 *                   format: uri
 *                 cuit:
 *                   type: string
 *                 rubro:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 calle:
 *                   type: string
 *                 numero:
 *                   type: string
 *                 piso:
 *                   type: string
 *                 dpto:
 *                   type: string
 *                 localidad:
 *                   type: string
 *                 provincia:
 *                   type: string
 *                 pais:
 *                   type: string
 *               example:
 *                 id_usuario: "1"
 *                 nombre_empresa: "Tech Solutions"
 *                 email_contacto: "contacto@tech.com"
 *                 logo: "https://example.com/logo.png"
 *                 sitio_web: "https://techsolutions.com"
 *                 cuit: "30712345678"
 *                 rubro: "Software"
 *                 telefono: "123456789"
 *                 calle: "Av. Siempre Viva"
 *                 numero: "742"
 *                 piso: "1"
 *                 dpto: "B"
 *                 localidad: "Springfield"
 *                 provincia: "Buenos Aires"
 *                 pais: "Argentina"
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */

empleadorRoutes.get('/datos',authMiddleware,onlyEmpresa,obtenerDatosEmpresa);


//===================================================================0
//End point : traer ofertas
//==================================================================
/**
 * @swagger
 * /empresa/traer/ofertas:
 *   get:
 *     summary: Obtener las ofertas laborales de la empresa autenticada
 *     tags:
 *       - Empleador - Ofertas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado_publicacion
 *         schema:
 *           type: string
 *           enum: [pendiente, aprobada, rechazada]
 *         description: Filtrar las ofertas por estado de publicación
 *     responses:
 *       200:
 *         description: Lista de ofertas laborales de la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OfertaLaboral'
 *       400:
 *         description: Estado de publicación no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Estado de publicación no válido
 *       401:
 *         description: Empresa no autenticada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Empresa no autenticada
 *       500:
 *         description: Error interno del servidor al obtener las ofertas
 */


empleadorRoutes.get('/traer/ofertas', authMiddleware,onlyEmpresa,obtenerOfertasEmpresa);

//====================================================================00
// End Point traer ofertas activas

/**
 * @swagger
 * /empresa/ofertas/activas:
 *   get:
 *     summary: Obtener todas las ofertas laborales activas
 *     tags:
 *       - Empleador - Ofertas
 *     description: Retorna todas las ofertas laborales activas/aprobadas disponibles públicamente.
 *     responses:
 *       200:
 *         description: Lista de ofertas activas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OfertaLaboral'
 *       500:
 *         description: Error interno del servidor al obtener las ofertas activas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error interno al obtener ofertas activas
 */


empleadorRoutes.get('/ofertas/activas', traerOfertasActivas);


//====================================================
// End point crear oferta laboral

/**
 * @swagger
 * /empresa/ofertas:
 *   post:
 *     summary: Crear una nueva oferta laboral
 *     tags:
 *       - Empleador - Ofertas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - puesto_requerido
 *               - descripcion
 *               - nivel_educativo_requerido
 *               - lugar_trabajo
 *               - modalidad
 *             properties:
 *               puesto_requerido:
 *                 type: string
 *                 example: Desarrollador Frontend
 *               descripcion:
 *                 type: string
 *                 example: Se busca desarrollador con experiencia en React y diseño UI/UX.
 *               nivel_educativo_requerido:
 *                 type: string
 *                 example: Universitario
 *               experiencia_requerida:
 *                 type: string
 *                 nullable: true
 *                 example: 2 años
 *               otros_requisitos:
 *                 type: string
 *                 nullable: true
 *                 example: Inglés técnico
 *               lugar_trabajo:
 *                 type: string
 *                 enum: [Presencial, Remoto, Mixto]
 *                 example: Remoto
 *               modalidad:
 *                 type: string
 *                 enum: [Tiempo completo, Medio tiempo, Contrato a plazo fijo, Pasantía, Freelance]
 *                 example: Tiempo completo
 *               tipo_contrato:
 *                 type: string
 *                 nullable: true
 *                 example: Relación de dependencia
 *               fecha_cierre:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 example: 2025-08-01
 *               localidad_del_puesto:
 *                 type: string
 *                 nullable: true
 *                 example: Mar del Plata
 *     responses:
 *       200:
 *         description: Oferta creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Oferta creada correctamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       404:
 *         description: Falta el ID de la empresa autenticada
 *       500:
 *         description: Error interno al crear la oferta
 */


empleadorRoutes.post('/ofertas', authMiddleware,onlyEmpresa,crearOfertaLaboral);


//==============================================================
// End point eliminar oferta

/**
 * @swagger
 * /empresa/eliminar/oferta/{id}:
 *   delete:
 *     summary: Eliminar una oferta laboral de la empresa autenticada
 *     tags:
 *       - Empleador - Ofertas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la oferta laboral a eliminar
 *     responses:
 *       200:
 *         description: Oferta eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Oferta eliminada correctamente
 *       400:
 *         description: Faltan datos necesarios (ID de oferta o empresa)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Faltan datos necesarios
 *       403:
 *         description: La oferta no pertenece a la empresa autenticada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No tienes permiso para eliminar esta oferta
 *       404:
 *         description: Oferta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Oferta no encontrada
 *       500:
 *         description: Error interno al eliminar la oferta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar la oferta
 */


empleadorRoutes.delete('/eliminar/oferta/:id', authMiddleware, onlyEmpresa, eliminarOfertaEmpresa);

//====================================
// End point editar oferta

/**
 * @swagger
 * /empresa/ofertas/{id}:
 *   patch:
 *     summary: Editar una oferta laboral existente
 *     tags:
 *       - Empleador - Ofertas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la oferta laboral a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               puesto_requerido:
 *                 type: string
 *                 example: Desarrollador Backend
 *               descripcion:
 *                 type: string
 *                 example: Experiencia en Node.js y PostgreSQL
 *               nivel_educativo_requerido:
 *                 type: string
 *                 example: Terciario
 *               experiencia_requerida:
 *                 type: string
 *                 nullable: true
 *                 example: 2 años
 *               otros_requisitos:
 *                 type: string
 *                 nullable: true
 *                 example: Inglés técnico
 *               lugar_trabajo:
 *                 type: string
 *                 enum: [Presencial, Remoto, Mixto]
 *                 example: Mixto
 *               modalidad:
 *                 type: string
 *                 enum: [Tiempo completo, Medio tiempo, Contrato a plazo fijo, Pasantía, Freelance]
 *                 example: Medio tiempo
 *               tipo_contrato:
 *                 type: string
 *                 nullable: true
 *                 example: Monotributista
 *               fecha_cierre:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 example: 2025-08-15
 *               localidad_del_puesto:
 *                 type: string
 *                 nullable: true
 *                 example: Necochea
 *     responses:
 *       200:
 *         description: Oferta editada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Oferta editada correctamente
 *       400:
 *         description: Datos inválidos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errores:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Oferta o empresa no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: La oferta no existe
 *       500:
 *         description: Error interno, oferta no editable o no autorizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Esta oferta no pertenece a su empresa
 */


empleadorRoutes.patch('/ofertas/:id',authMiddleware,onlyEmpresa,editarOfertaLaboral);

//======================================================================
//End point notificaciones de ofertas

/**
 * @swagger
 * /empresa/notificaciones:
 *   get:
 *     summary: Obtener notificaciones de la empresa autenticada
 *     tags:
 *       - Empleador - Notificaciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificaciones obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cantidad:
 *                   type: integer
 *                   example: 2
 *                 notificaciones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "d93a6e72-5a1f-4b88-8ea4-3e3d37f9db63"
 *                       mensaje:
 *                         type: string
 *                         example: "Nueva postulación recibida"
 *                       leida:
 *                         type: boolean
 *                         example: false
 *                       fecha:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-16T18:30:00.000Z"
 *       401:
 *         description: Empresa no autenticada
 *       500:
 *         description: Error interno al obtener notificaciones
 */


empleadorRoutes.get('/notificaciones', authMiddleware, onlyEmpresa, obtenerNotificaciones);

export default empleadorRoutes;