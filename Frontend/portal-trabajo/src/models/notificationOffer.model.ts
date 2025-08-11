export interface NotificationOffer {
    cantidad: number;
    notificaciones: [
        {
            id:string;
            mensaje: string;
            puesto: string;
            fecha_aprobacion: string;
        }
    ]
}