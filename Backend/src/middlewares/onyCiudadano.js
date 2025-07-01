export const onlyCiudadano = (req, res, next) => {
  if (req.usuario.tipo_usuario !== 'ciudadano') {
    return res.status(403).json({ error: 'Solo ciudadanos pueden subir CVs' });
  }
  next();
};