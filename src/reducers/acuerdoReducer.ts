import { Acuerdo } from '../interface/Acuerdos';
import { types } from '../types/types';

interface AcuerdoState {
    acuerdos: Acuerdo[];
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
        default:
            return state;
    }
}