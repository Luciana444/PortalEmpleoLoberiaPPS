--creacion de la primera tabla usuarios
create table usuarios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text unique not null,
  contrasena text not null,
  tipo_usuario text check (tipo_usuario in ('ciudadano', 'empresa', 'admin')) not null,
  fecha_registro timestamp default now(),
  estado boolean default true
);

--================================================

--tabla empresas:

create table empresas (
  id uuid not null default gen_random_uuid (),
  id_usuario uuid not null,
  nombre_empresa text not null,
  email_contacto text not null,
  logo text null,
  sitio_web text null,
  cuit character varying(20) not null,
  rubro text null,
  telefono text null,
  calle text not null,
  numero text not null,
  piso text null,
  dpto text null,
  localidad text not null,
  provincia text not null,
  pais text not null,
  estado_aprobacion character varying null default 'pendiente'::character varying,
  fecha_aprobacion timestamp without time zone null,
  email_admin_autorizador character varying null,
  constraint empresas_pkey primary key (id),
  constraint empresas_id_usuario_key unique (id_usuario),
  constraint empresas_id_usuario_fkey foreign KEY (id_usuario) references usuarios (id) on delete CASCADE,
  constraint empresas_estado_aprobacion_check check (
    (
      (estado_aprobacion)::text = any (
        (
          array[
            'pendiente'::character varying,
            'aprobada'::character varying,
            'rechazada'::character varying
          ]
        )::text[]
      )
    )
  )
) ;

--=================================================================

-- TABLA PERFILES ciudadanos (datos extendidos de usuarios)

CREATE TABLE perfiles_ciudadanos (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id_ciudadano UUID NOT NULL,

  -- Datos personales
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  fecha_nacimiento DATE,
  telefono TEXT,
  email TEXT NOT NULL,
  dni VARCHAR(20) NOT NULL,
  cuil VARCHAR(20) NOT NULL,

  -- Dirección detallada
  calle TEXT NOT NULL,
  numero TEXT NOT NULL,
  piso TEXT,
  dpto TEXT,
  localidad TEXT NOT NULL,
  provincia TEXT NOT NULL,
  pais TEXT NOT NULL,

  -- Nivel educativo y formación
  nivel_educativo TEXT NOT NULL,
  esta_cursando_carrera BOOLEAN NOT NULL,
  carrera_en_curso TEXT,

  -- Experiencia y habilidades
  situacion_laboral TEXT NOT NULL,
  tiene_emprendimiento TEXT,
  discapacidad TEXT NOT NULL,

  -- Imagen de perfil
  imagen_url TEXT,
  cv_url TEXT,

  -- Claves y relaciones
  CONSTRAINT perfiles_ciudadanos_pkey PRIMARY KEY (id),
  CONSTRAINT perfiles_ciudadanos_id_ciudadano_key UNIQUE (id_ciudadano),
  CONSTRAINT perfiles_ciudadanos_id_ciudadano_fkey FOREIGN KEY (id_ciudadano)
    REFERENCES usuarios (id) ON DELETE CASCADE
) ;

------------------------------------------------

--tabla de capacitaciones y habilidades:  (unida al formulario de perfil ciudadano)

CREATE TABLE capacitaciones_ciudadanos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_ciudadano UUID NOT NULL,
  nombre_capacitacion TEXT NOT NULL,
  CONSTRAINT fk_capacitacion_ciudadano FOREIGN KEY (id_ciudadano)
    REFERENCES perfiles_ciudadanos (id_ciudadano) ON DELETE CASCADE
);

--=============================================

-- TABLA OFERTAS LABORALES
CREATE TABLE ofertas_laborales (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  id_empresa UUID NOT NULL,

  puesto_requerido TEXT NOT NULL, -- reemplaza 'titulo'
  descripcion TEXT NOT NULL,
  
  nivel_educativo_requerido TEXT NOT NULL, -- select
  experiencia_requerida TEXT NULL,
  otros_requisitos TEXT NULL,
  
  lugar_trabajo VARCHAR(20) NOT NULL, -- select: Presencial, Remoto, Mixto
  
  modalidad VARCHAR(20) NOT NULL, -- select: Tiempo completo, Medio tiempo, Contrato a plazo fijo, Pasantía, Freelance
  
  tipo_contrato TEXT NULL,
  
  fecha_publicacion TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT now(),
  fecha_cierre DATE NULL,
  
  estado TEXT NULL DEFAULT 'activa',
  estado_publicacion VARCHAR NULL DEFAULT 'pendiente',
  fecha_aprobacion TIMESTAMP WITHOUT TIME ZONE NULL,
  email_admin_autorizador VARCHAR NULL,
  localidad_del_puesto TEXT,
  
  CONSTRAINT ofertas_laborales_pkey PRIMARY KEY (id),
  
  CONSTRAINT ofertas_laborales_estado_check CHECK (
    estado IN ('activa', 'cerrada', 'pausada')
  ),
  
  CONSTRAINT ofertas_laborales_estado_publicacion_check CHECK (
    estado_publicacion IN ('pendiente', 'aprobada', 'rechazada')
  ),
  
  CONSTRAINT ofertas_laborales_modalidad_check CHECK (
    modalidad IN ('Tiempo completo', 'Medio tiempo', 'Contrato a plazo fijo', 'Pasantía', 'Freelance')
  ),
  
  CONSTRAINT ofertas_laborales_lugar_trabajo_check CHECK (
    lugar_trabajo IN ('Presencial', 'Remoto', 'Mixto')
  ),

  CONSTRAINT ofertas_laborales_id_empresa_fkey FOREIGN KEY (id_empresa)
    REFERENCES empresas (id) ON DELETE CASCADE
) ;

--=======================================================

-- tabla postulaciones
CREATE TABLE postulaciones (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  
  id_ciudadano UUID NOT NULL,  -- antes era id_usuario
  id_oferta UUID NOT NULL,

  fecha_postulacion TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT now(),
  mensaje TEXT NULL,                   -- mensaje del postulante (opcional)
  cv_url TEXT NULL,                    -- CV personalizado (opcional)
  
  estado TEXT DEFAULT 'pendiente',    -- pendiente, aceptado, rechazado
  leido_por_empresa BOOLEAN DEFAULT FALSE,  -- indica si la empresa ya lo leyó

 
  CONSTRAINT postulaciones_pkey PRIMARY KEY (id),

  -- evitar que un ciudadano se postule dos veces a la misma oferta
  CONSTRAINT postulaciones_id_ciudadano_id_oferta_key UNIQUE (id_ciudadano, id_oferta),

  -- claves foráneas
  CONSTRAINT postulaciones_id_ciudadano_fkey FOREIGN KEY (id_ciudadano) REFERENCES perfiles_ciudadanos (id_ciudadano) ON DELETE CASCADE,
  CONSTRAINT postulaciones_id_oferta_fkey FOREIGN KEY (id_oferta) REFERENCES ofertas_laborales (id) ON DELETE CASCADE,

  -- control de estado
  CONSTRAINT postulaciones_estado_check CHECK (
    estado IN ('pendiente', 'aceptado', 'rechazado')
  )
);

---------------------------------------------------------------------------------
--tabla para cargar las experiencias laborales de los ciudadanos en el perfil
 
CREATE TABLE experiencias_laborales_ciudadanos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  id_ciudadano uuid NOT NULL,
  nombre_empresa text NOT NULL,
  desde date NOT NULL,
  hasta date,
  comentario varchar(500),
  CONSTRAINT experiencias_laborales_ciudadanos_pkey PRIMARY KEY (id),
  CONSTRAINT fk_experiencia_ciudadano FOREIGN KEY (id_ciudadano) REFERENCES perfiles_ciudadanos (id_ciudadano) ON DELETE CASCADE
) ;

----------------------------------------------------
--tabla para registrar visitas al portal

create table visitas_portal (
  id uuid not null default gen_random_uuid (),
  pagina text not null,
  fecha timestamp without time zone null default now(),
  ip text null,
  user_agent text null,
  tipo_usuario text null,
  id_usuario uuid null,
  constraint visitas_portal_pkey primary key (id)
);
