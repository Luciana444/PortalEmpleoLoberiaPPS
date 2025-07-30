export const onlyAdmin = (req, res, next) => {
  if (req.usuario.tipo_usuario !== 'admin') {
    return res.status(403).json({ error: 'Solo ciudadanos pueden subir CVs' });
  }
  next();
};