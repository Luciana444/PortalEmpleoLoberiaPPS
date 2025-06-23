--creacion de la aprimera tabla usuarios
/*
create table usuarios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text unique not null,
  contrasena text not null,
  tipo_usuario text check (tipo_usuario in ('ciudadano', 'empresa', 'admin')) not null,
  fecha_registro timestamp default now(),
  estado boolean default true
);


-- TABLA EMPRESAS (relacionada 1:1 con usuarios tipo empresa)
CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_usuario UUID UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nombre_empresa TEXT NOT NULL,
  direccion TEXT,
  telefono TEXT,
  sitio_web TEXT
);
-- TABLA PERFILES USUARIOS (datos extendidos de ciudadanos)
CREATE TABLE perfiles_usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_usuario UUID UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  fecha_nacimiento DATE,
  telefono TEXT,
  educacion TEXT,
  experiencia TEXT,
  habilidades TEXT,
  cv_url TEXT,
  imagen_url TEXT
);
-- TABLA OFERTAS LABORALES
CREATE TABLE ofertas_laborales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_empresa UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  requisitos TEXT,
  ubicacion TEXT,
  modalidad TEXT CHECK (modalidad IN ('presencial', 'remoto', 'hibrido')),
  tipo_contrato TEXT,
  fecha_publicacion TIMESTAMP DEFAULT now(),
  fecha_cierre DATE,
  estado TEXT DEFAULT 'activa' CHECK (estado IN ('activa', 'cerrada', 'pausada'))
);

-- TABLA POSTULACIONES
CREATE TABLE postulaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_usuario UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  id_oferta UUID NOT NULL REFERENCES ofertas_laborales(id) ON DELETE CASCADE,
  fecha_postulacion TIMESTAMP DEFAULT now(),
  mensaje TEXT,
  cv_url TEXT,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aceptado', 'rechazado')),
  UNIQUE (id_usuario, id_oferta)
);

CREATE TABLE tokens_invalidados (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    fecha_invalidado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);



*/

