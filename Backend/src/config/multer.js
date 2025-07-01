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

const upload = multer({ storage });

export default upload;
