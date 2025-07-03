import sql from '../database/db.js'

export const updatePerfilEmpresaById= async(id_usuario,datosActualizados)=>{

    if(!id_usuario){
        throw new Error('Falta el id de la empresa');
    }

    const camposValidos = [
    'nombre_empresa',
    'email_contacto',
    'sitio_web',
    'cuit',
    'rubro',
    'telefono',
    'calle',
    'numero',
    'piso',
    'dpto',
    'localidad',
    'provincia',
    'pais',
    'estado_aprobacion',
    'fecha_aprobacion',
    'email_admin_autorizador'
    ]

    const campos = Object.keys(datosActualizados).filter(campo => camposValidos.includes(campo));

    if(campos.length === 0){
        throw new Error('No se enviaron campos validos para actualizar el perfil');
    }

    
    const partesSet = campos.map((campo,i)=> `"${campo}" = $${i + 1}`);

    
    const valores = campos.map(campo => datosActualizados[campo]);

    const consulta = `UPDATE empresas SET ${partesSet.join(', ')} WHERE id_usuario = $${campos.length+1}`;

    await sql.unsafe(consulta, [...valores, id_usuario]);

}