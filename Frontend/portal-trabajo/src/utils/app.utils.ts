export class AppUtils {
    static convertToLocalString(date: string): string {
        return new Date(date).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    static formatIsoDateString(date: string): string {
        const [year, month, day] = date.substring(0, 10).split('-');
        return `${day}/${month}/${year}`;
    }

}