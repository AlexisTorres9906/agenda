import { Ui } from '../interface/Ui';
import { types } from '../types/types';


const initialState:Ui = {
    isLoading: false,
}

export const uiReducer = (state = initialState, action:types):Ui => {
    switch (action.type) {
        case '[ui] startLoading':
            return {
                ...state,
                isLoading: true,
            }
        case '[ui] stopLoading':
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}
