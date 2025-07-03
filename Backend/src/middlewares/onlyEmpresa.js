export const onlyEmpresa = (req, res, next) => {
  if (req.usuario.tipo_usuario !== 'empresa') {
    return res.status(403).json({error: 'Acceso permitido solo para empresas' });
  }
  next();
};