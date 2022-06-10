
export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    tickets: Smallticket[];
}

export interface Smallticket
{
    id: number;
    titulo: string;
    descripcion: string;
    estatus: string;
    Usuario: {
        email:string;
    };
    correo: string;
}

export interface Ticket{
    id: number;
    titulo: string;
    descripcion: string;
    estatus: string;
    Usuario: {
        email:string;
    };
    correo: string;
}