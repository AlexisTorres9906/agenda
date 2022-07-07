import { Info } from '../interface/Info';
import { types } from '../types/types';

const InitialState: Info = {
    Categorias: [],
    Ambitos: [],
    FolioA: '',
    Usuarios: []
}

export const infoReducer = (state = InitialState, action: types): Info => {
    switch (action.type) {
        
        case "[info] getCategorias":
            return {
                ...state,
                Categorias: action.payload
            }
        case "[info] getAmbitos":
            return {
                ...state,
                Ambitos: action.payload
            }
        case "[info] getFolioA":
            return {
                ...state,
                FolioA: action.payload
            }
        case "[info] reset":
            return {
                ...InitialState
            }
        case "[info] getUsuarios":
            return {
                ...state,
                Usuarios: action.payload
            }
        default:
            return state;
    }
}