import { subirCvBD } from "../services/ciudadanoService.js";


export const subirCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta el archivo CV en formato PDF' });
    }
    const url_cv = `/uploads/cv/${req.file.filename}`;
    console.log(req.file.filename);

    await subirCvBD(req.usuario.id,url_cv);

    return res.status(200).json({
      mensaje: 'CV subido correctamente',
      url: url_cv
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al subir el CV' });
  }
};