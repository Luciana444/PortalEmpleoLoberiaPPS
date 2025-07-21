import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    getCurrentUserType(): string | null {
        const token = localStorage.getItem('token');
        if (!token)
            return null;

        try {
            const userData = this.parseJwt(token);
            return userData?.tipo_usuario || null;
        } catch (e) {
            console.error("Error parsing JWT:", e);
            return null;
        }
    }

    getCurrentUserId(): string | null {
        const token = localStorage.getItem('token');
        if (!token)
            return null;

        try {
            const userData = this.parseJwt(token);
            return userData?.id || null;
        } catch (e) {
            console.error("Error parsing JWT:", e);
            return null;
        }
    }

    private parseJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }
}