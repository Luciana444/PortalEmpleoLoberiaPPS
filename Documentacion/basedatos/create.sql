--creacion de la primera tabla usuarios

create table usuarios (
  id uuid not null default gen_random_uuid (),
  nombre text not null,
  email text not null,
  contrasena text not null,
  tipo_usuario text not null,
  fecha_registro timestamp without time zone null default now(),
  estado boolean null default true,
  constraint usuarios_pkey primary key (id),
  constraint usuarios_email_key unique (email),
  constraint usuarios_tipo_usuario_check check (
    (
      tipo_usuario = any (
        array['ciudadano'::text, 'empresa'::text, 'admin'::text]
      )
    )
  )
);
--================================================

--tabla empresas:

create table empresas (
  id uuid not null default gen_random_uuid (),
  id_usuario uuid not null,
  nombre_empresa text null,
  email_contacto text null,
  logo text null,
  sitio_web text null,
  cuit character varying(20) null,
  rubro text null,
  telefono text null,
  calle text null,
  numero text null,
  piso text null,
  dpto text null,
  localidad text null,
  provincia text null,
  pais text null,
  estado_aprobacion character varying null default 'pendiente'::character varying,
  fecha_aprobacion timestamp without time zone null,
  email_admin_autorizador character varying null,
  constraint empresas_pkey primary key (id),
  constraint empresas_id_usuario_key unique (id_usuario),
  constraint empresas_id_usuario_fkey foreign KEY (id_usuario) references usuarios (id) on delete CASCADE,
  constraint empresas_estado_aprobacion_check check (
    (
      (estado_aprobacion)::text = any (
        array[
          ('pendiente'::character varying)::text,
          ('aprobada'::character varying)::text,
          ('rechazada'::character varying)::text
        ]
      )
    )
  )
);

--=================================================================

-- TABLA PERFILES ciudadanos (datos extendidos de usuarios)

create table perfiles_ciudadanos (
  id uuid not null default gen_random_uuid (),
  id_ciudadano uuid not null,
  nombre text null,
  apellido text null,
  fecha_nacimiento date null,
  telefono text null,
  email text null,
  dni character varying(20) null,
  cuil character varying(20) null,
  calle text null,
  numero text null,
  piso text null,
  dpto text null,
  localidad text null,
  provincia text null,
  pais text null,
  nivel_educativo text null,
  esta_cursando_carrera boolean null,
  carrera_en_curso text null,
  situacion_laboral text null,
  tiene_emprendimiento text null,
  discapacidad text null,
  imagen_url text null,
  cv_url text null,
  constraint perfiles_ciudadanos_pkey primary key (id),
  constraint perfiles_ciudadanos_id_ciudadano_key unique (id_ciudadano),
  constraint perfiles_ciudadanos_id_ciudadano_fkey foreign KEY (id_ciudadano) references usuarios (id) on delete CASCADE
);
------------------------------------------------

--tabla de capacitaciones y habilidades:  (unida al formulario de perfil ciudadano)

create table capacitaciones_ciudadanos (
  id uuid not null default gen_random_uuid (),
  id_ciudadano uuid not null,
  nombre_capacitacion text not null,
  constraint capacitaciones_ciudadanos_pkey primary key (id),
  constraint fk_capacitacion_ciudadano foreign KEY (id_ciudadano) references perfiles_ciudadanos (id_ciudadano) on delete CASCADE
);




--=============================================



-- TABLA OFERTAS LABORALES
create table ofertas_laborales (
  id uuid not null default gen_random_uuid (),
  id_empresa uuid not null,
  puesto_requerido text not null,
  descripcion text not null,
  nivel_educativo_requerido text not null,
  experiencia_requerida text null,
  otros_requisitos text null,
  lugar_trabajo character varying(20) not null,
  modalidad character varying(20) not null,
  tipo_contrato text null,
  fecha_publicacion timestamp without time zone null default now(),
  fecha_cierre date null,
  estado text null default 'activa'::text,
  estado_publicacion character varying null default 'pendiente'::character varying,
  fecha_aprobacion timestamp without time zone null,
  email_admin_autorizador character varying null,
  localidad_del_puesto text null,
  notificacion text null,
  constraint ofertas_laborales_pkey primary key (id),
  constraint ofertas_laborales_id_empresa_fkey foreign KEY (id_empresa) references empresas (id_usuario) on delete CASCADE,
  constraint ofertas_laborales_estado_check check (
    (
      estado = any (
        array['activa'::text, 'cerrada'::text, 'pausada'::text]
      )
    )
  ),
  constraint ofertas_laborales_estado_publicacion_check check (
    (
      (estado_publicacion)::text = any (
        (
          array[
            'pendiente'::character varying,
            'aprobada'::character varying,
            'rechazada'::character varying
          ]
        )::text[]
      )
    )
  ),
  constraint ofertas_laborales_lugar_trabajo_check check (
    (
      (lugar_trabajo)::text = any (
        (
          array[
            'Presencial'::character varying,
            'Remoto'::character varying,
            'Mixto'::character varying
          ]
        )::text[]
      )
    )
  ),
  constraint ofertas_laborales_modalidad_check check (
    (
      (modalidad)::text = any (
        (
          array[
            'Tiempo completo'::character varying,
            'Medio tiempo'::character varying,
            'Contrato a plazo fijo'::character varying,
            'Pasantía'::character varying,
            'Freelance'::character varying
          ]
        )::text[]
      )
    )
  )
);
--=======================================================

-- tabla postulaciones
create table postulaciones (
  id uuid not null default gen_random_uuid (),
  id_ciudadano uuid not null,
  id_oferta uuid not null,
  fecha_postulacion timestamp without time zone null default now(),
  mensaje text null,
  cv_url text null,
  estado text null default 'pendiente'::text,
  leido_por_empresa boolean null default false,
  constraint postulaciones_pkey primary key (id),
  constraint postulaciones_id_ciudadano_id_oferta_key unique (id_ciudadano, id_oferta),
  constraint postulaciones_id_ciudadano_fkey foreign KEY (id_ciudadano) references perfiles_ciudadanos (id_ciudadano) on delete CASCADE,
  constraint postulaciones_id_oferta_fkey foreign KEY (id_oferta) references ofertas_laborales (id) on delete CASCADE,
  constraint postulaciones_estado_check check (
    (
      estado = any (
        array[
          'pendiente'::text,
          'aceptado'::text,
          'rechazado'::text
        ]
      )
    )
  )
);

---------------------------------------------------------------------------------
--tabla para cargar las experiencias laborales de los ciudadanos en el perfil
 
create table experiencias_laborales_ciudadanos (
  id uuid not null default gen_random_uuid (),
  id_ciudadano uuid not null,
  nombre_empresa text not null,
  desde date not null,
  hasta date null,
  comentario character varying(500) null,
  constraint experiencias_laborales_ciudadanos_pkey primary key (id),
  constraint fk_experiencia_ciudadano foreign KEY (id_ciudadano) references perfiles_ciudadanos (id_ciudadano) on delete CASCADE
);
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
