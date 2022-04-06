import { Admin } from '../interface/Admin';
import { types } from '../types/types';


const initialState:Admin = {
    Users: [],
}

export const adminReducer = (state = initialState, action:types):Admin => {

    switch (action.type) {
        case "[Admin] getUsers":
            return {
                ...state,
                Users: action.payload
            }
        default:
           return state
    }
}