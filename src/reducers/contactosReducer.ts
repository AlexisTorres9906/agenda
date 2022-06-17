import { Contacto } from "../interface/Contacto";
import { types } from "../types/types";


interface contactosState {
    contactos: Contacto[];
    activeContacto?: Contacto;
    ResponseOk: boolean;
}

const initialState: contactosState = {
    contactos: [],
    ResponseOk: false,
    activeContacto: undefined
};

export const  contactosReducer = (
    state = initialState,
    action: types
): contactosState => {
    switch (action.type) {
        case "[Contacto] getContactos":
            return {
                ...state,
                contactos: action.payload
            };
        case "[Contacto] addContacto":
            return {
                ...state,
                contactos: [...state.contactos, action.payload]
            };
        case "[Contacto] setActiveContacto":
            return {
                ...state,
                activeContacto: action.payload
            };
        case "[Contacto] cleanActiveContacto":
            return {
                ...state,
                activeContacto: undefined
            };
        case "[Contacto] updateContacto":
            return {
                ...state,
                contactos: state.contactos.map(
                    contacto =>
                        contacto._id === action.payload._id
                            ? (contacto = action.payload)
                            : contacto
                )
            };
        case "[Contacto] deleteContacto":
            return {
                ...state,
                contactos: state.contactos.filter(
                    contacto => contacto._id !== action.payload
                )
            };
        case "[Contacto] setResponseOk":
            return {
                ...state,
                ResponseOk: action.payload
            };
        case "[Acuerdo] clearAcuerdos":
            return initialState;

        default:
            return state;
    }
}