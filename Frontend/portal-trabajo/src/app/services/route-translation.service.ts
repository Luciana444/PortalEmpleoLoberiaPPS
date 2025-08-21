import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouteTranslationService {
    private translations: { [key: string]: string } = {
        '': 'inicio',
        'register-user': 'registrar-usuario',
        'login': 'iniciar-sesion',
        'landing': 'inicio',
        'recovery': 'recuperar-contrasena',
        'reset': 'restablecer-contrasena',
        'edit-profile': 'editar-perfil',
        'create-offer': 'crear-oferta',
        'employee-profile': 'perfil-empleado',
        'detail': 'detalle',
        'edit-profile-employer': 'editar-perfil-empleador',
        'employer-profile': 'perfil-empleador',
        'work-experience': 'experiencia-laboral',
        'academic-background-edit': 'editar-formacion-academica',
        // 'postulaciones-por-oferta': 'postulaciones',
        'postulations-by-offer': 'postulaciones-por-oferta',
        'profile': 'perfil',
        'admin-panel': 'panel-administrador',
    };

    constructor(private router: Router, private route: ActivatedRoute) { }

    getTranslatedPath(englishPath: string): string {
        return this.translations[englishPath] || englishPath;
    }

    getEnglishPath(spanishPath: string): string {
        return this.translations[spanishPath] || spanishPath;
    }

    // Translate entire route path
    translateRoutePath(path: string): string {
        const segments = path.split('/');
        return segments.map(segment => {
            // Don't translate route parameters (starting with :)
            if (segment.startsWith(':')) {
                return segment;
            }
            return this.getTranslatedPath(segment);
        }).join('/');
    }

    // Get English route path from Spanish
    getEnglishRoutePath(path: string): string {
        const segments = path.split('/');
        return segments.map(segment => {
            if (segment.startsWith(':')) {
                return segment;
            }
            return this.getEnglishPath(segment);
        }).join('/');
    }

    navigateToTranslated(route: any[], extras: NavigationExtras = {}) {
        const translatedRoute = route.map(segment => {
            // Convert to string first
            const segmentStr = String(segment);

            // Skip translation for route parameters (starting with :)
            if (segmentStr.startsWith(':')) {
                return segmentStr;
            }
            return this.getTranslatedPath(segmentStr) || segmentStr;
        });

        this.router.navigate(translatedRoute, extras);
    }

    // Get current translated URL
    getCurrentTranslatedUrl(): string {
        const currentUrl = this.router.url;
        return this.translateRoutePath(currentUrl);
    }

    // Navigate using full path (handles parameters better)
    navigateByTranslatedPath(path: string, queryParams?: any) {
        const translatedPath = this.translateRoutePath(path);
        this.router.navigate([translatedPath], { queryParams });
    }
}