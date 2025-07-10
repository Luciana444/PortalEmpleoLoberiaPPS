import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ruta donde se guardarán las fotos
const carpetaDestino = 'perfiles/fotos';

// Asegura que la carpeta exista
fs.mkdirSync(carpetaDestino, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, carpetaDestino);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const nombreArchivo = `perfil_${Date.now()}${extension}`;
    cb(null, nombreArchivo);
  }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true); // aceptar
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, jpeg, png)'), false); // rechazar
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
