import { Admin } from '../interface/Admin';
import { types } from '../types/types';
import { User } from '../interface/User';


const initialState:Admin = {
    admInformation:{
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
                admInformation: {
                    ...state.admInformation,
                    Users: action.payload
                }
            }
        case "[Admin] getAreas":
            return {
                ...state,
                admInformation: {
                    ...state.admInformation,
                Areas: action.payload
                }
            }
        case "[Admin] addUser":
            return {
                ...state,
                admInformation: {
                    ...state.admInformation,
                    Users: [...state.admInformation.Users, action.payload],
                    ResponseOk: true
                }
            }
        case "[Admin] changeUserResOk":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    ResponseOk: action.payload
                }
            }
        case "[Admin] setActiveUser" :
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    ActiveUser: action.payload
                }
            }
        case "[Admin] cleanActiveUser" :
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    ActiveUser: null
                }
            }
        case "[Admin] clearAdmin" :
            return {
                ...initialState,
            }
        case "[Admin] updateUser":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Users: state.admInformation.Users.map((user:User) => {
                        if (user.uid === action.payload.uid) {
                            return action.payload;
                        }
                        return user;
                    })
                }
            }
        case "[Admin] deleteUser":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Users: state.admInformation.Users.filter((user:User) => user.uid !== action.payload)
                }
            }
        case "[Admin] setActiveArea":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    ActiveArea: action.payload
                }
            }
        case "[Admin] cleanActiveArea":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    ActiveArea: null as any
                }
            }
        default:
           return state
    }
}