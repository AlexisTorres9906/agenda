import { Admin} from '../interface/Admin';
import { types } from '../types/types';
import { User } from '../interface/User';


const initialState:Admin = {
    admInformation:{
    Users: [],
    Areas: [],
    Ambitos : [],
    Categorias: [],
    ResponseOk: false,
    ActiveUser: null,
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
        case "[Admin] getCategorias":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Categorias: action.payload
                }
            }
        case "[Admin] setActiveCategory":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    ActiveCategory: action.payload
                }
            }
        case "[Admin] cleanActiveCategory":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    ActiveCategory: null as any
                }
            }
        case "[Admin] addCategory":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Categorias: [...state.admInformation.Categorias, action.payload]
            }
        }
        case "[Admin] updateCategory":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Categorias: state.admInformation.Categorias.map((category:any) => {
                        if (category._id === action.payload._id) {
                            return action.payload;
                        }
                        return category;
                    })
                }
            }
        case "[Admin] deleteCategory":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Categorias: state.admInformation.Categorias.filter((category:any) => category._id !== action.payload)
                }
            }
        case "[Admin] getAmbitos":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Ambitos: action.payload
                }
            }
        case "[Admin] addAmbito":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Ambitos: [...state.admInformation.Ambitos, action.payload],
            }
        }
        case "[Admin] updateAmbito":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Ambitos: state.admInformation.Ambitos.map((ambito:any) => {
                        if (ambito._id === action.payload._id) {
                            return action.payload;
                        }
                        return ambito;
                    })
                }
            }
        case "[Admin] deleteAmbito":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    Ambitos: state.admInformation.Ambitos.filter((ambito:any) => ambito._id !== action.payload)
                }
            }
        case "[Admin] setActiveAmbito":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    ActiveAmbito: action.payload
                }
            }
        case "[Admin] cleanActiveAmbito":
            return {
                ...state,
                admInformation:{
                    ...state.admInformation,
                    ActiveAmbito: undefined
                }
            }
        default:
           return state
    }
}