import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VisitTrackingService {
    private readonly API_URL = `${environment.apiUrl}/api/auth/visitas`;

    constructor(private http: HttpClient) { }

    async trackVisit(pagePath: string): Promise<void> {
        console.log('[VisitService] Attempting to track visit for:', pagePath);

        if (!this.isAuthenticated()) {
            console.warn('[VisitService] User not authenticated, skipping tracking');
            return;
        }

        try {
            const response = await this.http.post(
                this.API_URL,
                { pagina: pagePath },
                { headers: this.getAuthHeaders() }
            ).toPromise();

            console.log('[VisitService] Visit tracked successfully:', response);
        } catch (error) {
            console.error('[VisitService] Failed to track visit:', error);
            throw error; // Re-throw if you want components to handle errors
        }
    }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    private isAuthenticated(): boolean {
        try {
            const token = localStorage.getItem('token');
            if (!token) return false;

            const decoded = jwtDecode(token) as { exp?: number };
            return !(decoded.exp && Date.now() >= decoded.exp * 1000);
        } catch (error) {
            console.error('[VisitService] Token validation error:', error);
            return false;
        }
    }
}