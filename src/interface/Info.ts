import { Categorias, Ambito } from './Admin';
import { UsuariosP } from './User';
export interface Info {
    Categorias : Categorias[];
    Ambitos: Ambito[];
    FolioA: String;
    Usuarios: UsuariosP[]
    conteo: {
        bajos: number,
        medios: number,
        altos: number
    }
}