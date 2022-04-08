import { Admin } from '../interface/Admin';
import { types } from '../types/types';


const initialState:Admin = {
    UserTab:{
    Users: [],
    Areas: [],
    ResponseOk: false,
    ActiveUser: null 
    }
}

export const adminReducer = (state = initialState, action:types):Admin => {

    switch (action.type) {
        case "[Admin] getUsers":
            return {
                ...state,
                UserTab: {
                    ...state.UserTab,
                    Users: action.payload
                }
            }
        case "[Admin] getAreas":
            return {
                ...state,
                UserTab: {
                    ...state.UserTab,
                Areas: action.payload
                }
            }
        case "[Admin] addUser":
            return {
                ...state,
                UserTab: {
                    ...state.UserTab,
                    Users: [...state.UserTab.Users, action.payload],
                    ResponseOk: true
                }
            }
        case "[Admin] changeUserResOk":
            return {
                ...state,
                UserTab:{
                    ...state.UserTab,
                    ResponseOk: action.payload
                }
            }
        case "[Admin] setActiveUser" :
            return {
                ...state,
                UserTab:{
                    ...state.UserTab,
                    ActiveUser: action.payload
                }
            }
        case "[Admin] cleanActiveUser" :
            return {
                ...state,
                UserTab:{
                    ...state.UserTab,
                    ActiveUser: null
                }
            }
        case "[Admin] clearAdmin" :
            return {
                ...initialState,
            }
                
        default:
           return state
    }
}