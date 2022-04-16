import { Admin} from '../interface/Admin';
import { types } from '../types/types';
import { User } from '../interface/User';


const initialState:Admin = {
    admInformation:{
    Users: [],
    Areas: [],
    Categorias: [],
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
        case "[Admin] changeResponseOK":
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
        case "[Admin] addArea":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Areas: [...state.admInformation.Areas, action.payload],
                    ResponseOk: true
                }
            }
        case "[Admin] updateArea":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Areas: state.admInformation.Areas.map((area:any) => {
                        if (area._id === action.payload._id) {
                            return action.payload;
                        }
                        return area;
                    })
                }
            }
        case "[Admin] deleteArea":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Areas: state.admInformation.Areas.filter((area:any) => area._id !== action.payload)
                }
            }
        default:
           return state
    }
}