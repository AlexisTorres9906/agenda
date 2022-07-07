export interface User {
    uid: string;
    name: string;
    area: {
        nombre: string;
        nombreCorto: string;
    }
}

export interface UsuariosP {
    _id: string;
    userName: string;
    area:{
        _id : string;
        nombre: string;
        nombreCorto: string;
    }
    name: string;
}