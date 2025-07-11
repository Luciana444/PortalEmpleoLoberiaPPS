export interface JobOffer {
    id: number;
    id_empresa: string;
    localidad: string;
    puesto_requerido: string;
    descripcion: string;
    lugar_trabajo: string;
    fecha_publicacion: string;
    experiencia: string;
    otros_requisitos: string;
    nivel_educativo: string;
    // img: string;
    // Add other properties you expect from the API
}