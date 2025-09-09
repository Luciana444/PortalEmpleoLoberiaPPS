export class AppUtils {
  static convertToLocalString(date: string): string {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');

    // formato: 24/06/2025
    return `${day}/${month}/${year}`;
  }
}