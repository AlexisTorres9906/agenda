import { Acuerdo } from '../interface/Acuerdos';
import { types } from '../types/types';

interface AcuerdoState {
    acuerdos: Acuerdo[];
    activeAcuerdo?: Acuerdo;
}

const initialState:AcuerdoState = {
    acuerdos: [],
};

export const acuerdoReducer = (state = initialState, action:types):AcuerdoState => {
    switch (action.type) {
        case "[Acuerdo] getAcuerdos":
            return {
                ...state,
                acuerdos: action.payload
            }
        case "[Acuerdo] clearAcuerdos":
            return {
                ...state,
                acuerdos: []
            }
        case "[Acuerdo] addAcuerdo":
            return {
                ...state,
                acuerdos: [...state.acuerdos, action.payload]
            }
        case "[Acuerdo] setActiveAcuerdo":
            return {
                ...state,
                activeAcuerdo: action.payload
            }
        case "[Acuerdo] clearActiveAcuerdo":
            return {
                ...state,
                activeAcuerdo: undefined
            }
        default:
            return state;
    }
}