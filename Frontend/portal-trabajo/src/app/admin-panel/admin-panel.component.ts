import { Component, OnInit, ChangeDetectionStrategy, signal } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ReportsComponent } from "../reports/reports.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { JobOffer } from "../../models/jobOffer.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ReportsService } from "../services/reports.service";
import { AdminService } from "../services/admin.service";
import { AppUtils } from "../../utils/app.utils";
import { MatDivider } from "@angular/material/divider";
import { Employee } from "../../models/employee.model";
import { Employer } from "../../models/employer.model";


@Component({
    selector: 'app-postulation-list',
    imports: [FooterComponent, HeaderComponent, ReportsComponent, MatExpansionModule, MatTooltipModule],
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.scss',
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AdminPanelComponent implements OnInit {
    itemId: string = "";
    offers: JobOffer[] = [{
        id: "offer-001",
        id_empresa: "comp-001",
        nombre_empresa: "Tech Solutions SA",
        localidad: "CABA",
        puesto_requerido: "Desarrollador Frontend",
        descripcion: "Buscamos desarrollador con experiencia en Angular y TypeScript",
        lugar_trabajo: "Híbrido",
        modalidad: "Tiempo completo",
        tipo_contrato: "Indeterminado",
        fecha_publicacion: "2023-06-01",
        fecha_cierre: "2023-06-30",
        experiencia_requerida: "2+ años en desarrollo frontend",
        otros_requisitos: "Inglés intermedio",
        nivel_educativo_requerido: "Terciario completo",
        logo: "tech-solutions-logo.png",
        estado_publicacion: "activa"
    },
    {
        id: "offer-002",
        id_empresa: "comp-002",
        nombre_empresa: "Consultores Asociados",
        localidad: "CABA",
        puesto_requerido: "Consultor Junior",
        descripcion: "Posición para recién graduados en administración de empresas",
        lugar_trabajo: "Presencial",
        modalidad: "Medio tiempo",
        tipo_contrato: "Pasantía",
        fecha_publicacion: "2023-06-05",
        fecha_cierre: "2023-07-15",
        experiencia_requerida: "No requiere experiencia",
        otros_requisitos: "Disponibilidad para viajar",
        nivel_educativo_requerido: "Universitario en curso",
        logo: "consultores-logo.png",
        estado_publicacion: "activa"
    },
    {
        id: "offer-003",
        id_empresa: "comp-003",
        nombre_empresa: "Alimentos Naturales",
        localidad: "CABA",
        puesto_requerido: "Ejecutivo de Ventas",
        descripcion: "Venta de productos naturales a clientes corporativos",
        lugar_trabajo: "Remoto",
        modalidad: "Tiempo completo",
        tipo_contrato: "Plazo fijo 6 meses",
        fecha_publicacion: "2023-05-20",
        fecha_cierre: "2023-06-10",
        experiencia_requerida: "1+ años en ventas",
        otros_requisitos: "Auto propio",
        nivel_educativo_requerido: "Secundario completo",
        logo: "alimentos-logo.png",
        estado_publicacion: "cerrada"
    }];
    employees: Employee[] = [{
        id: "emp-001",
        id_ciudadano: "user-001",
        nombre: "María",
        apellido: "González",
        email: "maria.gonzalez@example.com",
        dni: "35123456",
        cuil: "20-35123456-7",
        fecha_nacimiento: "1990-05-15",
        telefono: "+5491156789012",
        calle: "Av. Corrientes",
        numero: "1234",
        piso: "3",
        departamento: "B",
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        nivel_educativo: "Universitario completo",
        esta_cursando_carrera: false,
        carrera_en_curso: "",
        situacion_laboral: "empleado",
        tiene_emprendimiento: "No",
        discapacidad: false,
        foto: "maria-profile.jpg",
        imagen_url: "https://example.com/images/maria-gonzalez.jpg",
        cv_url: "https://example.com/cv/maria-gonzalez.pdf",
        capacitaciones: [],
        experiencias_laborales: []
    },
    {
        id: "emp-002",
        id_ciudadano: "user-002",
        nombre: "Carlos",
        apellido: "Rodríguez",
        email: "carlos.rodriguez@example.com",
        dni: "30234567",
        cuil: "20-30234567-8",
        fecha_nacimiento: "1985-11-22",
        telefono: "+5491167890123",
        calle: "Calle Florida",
        numero: "567",
        piso: "",
        departamento: "",
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        nivel_educativo: "Secundario completo",
        esta_cursando_carrera: true,
        carrera_en_curso: "Analista de Sistemas",
        situacion_laboral: "desempleado",
        tiene_emprendimiento: "Sí",
        discapacidad: true,
        foto: "carlos-profile.jpg",
        imagen_url: "https://example.com/images/carlos-rodriguez.jpg",
        cv_url: "https://example.com/cv/carlos-rodriguez.pdf",
        capacitaciones: [],
        experiencias_laborales: []
    },
    {
        id: "emp-003",
        id_ciudadano: "user-003",
        nombre: "Lucía",
        apellido: "Fernández",
        email: "lucia.fernandez@example.com",
        dni: "33456789",
        cuil: "27-33456789-4",
        fecha_nacimiento: "1995-03-10",
        telefono: "+5491178901234",
        calle: "Av. Santa Fe",
        numero: "2345",
        piso: "1",
        departamento: "A",
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        nivel_educativo: "Terciario completo",
        esta_cursando_carrera: false,
        carrera_en_curso: "",
        situacion_laboral: "cambio",
        tiene_emprendimiento: "No",
        discapacidad: false,
        foto: "lucia-profile.jpg",
        imagen_url: "https://example.com/images/lucia-fernandez.jpg",
        cv_url: "https://example.com/cv/lucia-fernandez.pdf",
        capacitaciones: [],
        experiencias_laborales: []
    }];
    employers: Employer[] = [{
        id_usuario: "comp-001",
        nombre_empresa: "Tech Solutions SA",
        email_contacto: "contacto@techsolutions.com",
        logo: "tech-solutions-logo.png",
        sitio_web: "https://www.techsolutions.com",
        cuit: "30-12345678-9",
        rubro: "Tecnología",
        telefono: "+5491145678901",
        calle: "Av. Libertador",
        numero: "7890",
        piso: "10",
        dpto: "C",
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        estado_aprobacion: "aprobado"
    },
    {
        id_usuario: "comp-002",
        nombre_empresa: "Consultores Asociados",
        email_contacto: "rrhh@consultores.com",
        logo: "consultores-logo.png",
        sitio_web: "https://www.consultores.com",
        cuit: "30-23456789-1",
        rubro: "Consultoría",
        telefono: "+5491156789012",
        calle: "Calle Reconquista",
        numero: "500",
        piso: "5",
        dpto: "A",
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        estado_aprobacion: "pendiente"
    },
    {
        id_usuario: "comp-003",
        nombre_empresa: "Alimentos Naturales",
        email_contacto: "empleos@alimentosnaturales.com",
        logo: "alimentos-logo.png",
        sitio_web: "https://www.alimentosnaturales.com",
        cuit: "30-34567891-2",
        rubro: "Alimentación",
        telefono: "+5491167890123",
        calle: "Av. Cabildo",
        numero: "2345",
        piso: "2",
        dpto: "B",
        localidad: "CABA",
        provincia: "Buenos Aires",
        pais: "Argentina",
        estado_aprobacion: "rechazado"
    }];

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private reportsservice: ReportsService,
        private adminservice: AdminService,
    ) { }

    ngOnInit(): void {
        // this.getOffers();
        // this.getEmployees();
        // this.getEmployers();

    }

    readonly panelOpenState = signal(false);

    getOffers() {
        this.adminservice.getOffersLikeAdmin().subscribe({
            next: (response) => {
                if (response.status === 200) { // Populate form with API data
                    this.offers = response.body || [];
                } else {
                    console.log('No se pudo cargar oferta', response);
                }
            },
            error: (err) => {
                console.error('Error al cargar oferta', err);
            }
        });
    }

    getEmployees() {
        this.adminservice.getEmployeesLikeAdmin().subscribe({
            next: (response) => {
                if (response.status === 200) { // Populate form with API data
                    this.employees = response.body || [];
                } else {
                    console.log('No se pudo cargar ciudadanos', response);
                }
            },
            error: (err) => {
                console.error('Error al cargar ciudadano', err);
            }
        });
    }

    getEmployers() {
        this.adminservice.getEmployersLikeAdmin().subscribe({
            next: (response) => {
                if (response.status === 200) { // Populate form with API data
                    this.employers = response.body || [];
                } else {
                    console.log('No se pudo cargar empresas', response);
                }
            },
            error: (err) => {
                console.error('Error al cargar empresa', err);
            }
        });
    }


    getImageUrl(image_url: string) {
        return image_url ? `http://localhost:3000${image_url}` : null;
    }

    navigateToPostulationDetail(id: any) {
        this.router.navigate(['/detail', id], { state: { from: this.router.url } });
    }

    navigateToProfile(id: any) {
        this.router.navigate(['/employee-profile', id], { state: { from: this.router.url } });
    }

    navigateToProfileEmployer(id: any) {
        this.router.navigate(['/employer-profile', id], { state: { from: this.router.url } });
    }

    convertToLocalDate(date: string | undefined) {
        if (date)
            return AppUtils.convertToLocalString(date);

        return "";
    }
}




