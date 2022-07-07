import { Acuerdo, Usuarios } from './Acuerdos';
export interface Solicitud {
    _id: string;
    usuario: Usuarios;
    invitador: Usuarios;
    acuerdo : Acuerdo;
}