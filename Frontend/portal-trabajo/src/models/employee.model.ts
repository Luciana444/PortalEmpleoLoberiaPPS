import { AcademicBackground } from "./academic-background.model";
import { WorkExperience } from "./work-experience.model";

export interface Employee {
    id: string;
    nombre: string;
    email: string;
    dni: string;
    cuil: string;
    fecha_nacimiento: string;
    telefono: string;
    calle: string;
    numero: string;
    piso: string;
    departamento: string;
    localidad: string;
    provincia: string;
    pais: string;
    nivel_educativo: string;
    esta_cursando_carrera: boolean;
    carrera_en_curso: string;
    situacion_laboral: string;
    tiene_emprendimiento: string;
    discapacidad: boolean;
    foto: string;
    imagen_url: string;
    cv_url: string;
    capacitaciones: AcademicBackground[];
    experiencias_laborales: WorkExperience[];
}