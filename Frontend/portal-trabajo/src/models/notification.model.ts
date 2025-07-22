export interface Notification {
    cantidad: number;
    notificaciones: [
        {
            id: string;
            mensaje: string;
            fecha_postulacion: string;
            leida: boolean;
        }
    ]
}