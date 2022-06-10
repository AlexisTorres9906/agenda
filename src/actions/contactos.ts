import { reqInsConToken } from "../helpers/axios";
import { ErrorSwall, LoadingSwall, toastMixin } from '../helpers/swalls';
import { types } from "../types/types";
////////////////////////////////////////////////////////////////////////////////////
export const startGetContactos = () =>{
    return async (dispatch: any) => {
        await reqInsConToken
        .get("/contacto")
        .then((res) => {
            dispatch(getContactos(res.data.contactos));
        })
        .catch((err) => {
            ErrorSwall.fire({
                title: "Error",
                text: "No se pudo obtener los contactos",
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        });
    }
}

const getContactos = (contactos: any): types => ({
    type: "[Contacto] getContactos",
    payload: contactos,
});
////////////////////////////////////////////////////////////////////////////////////

export const startAddContacto = (contacto: any) =>{
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    return async (dispatch: any) => {
        await reqInsConToken
        .post("/contacto", contacto)
        .then((res) => {
            if(res.data.ok){
                dispatch(addContacto(res.data.contacto));
                dispatch(setResponseOk(true));
            }else{
                error = true;
                errorMsg = res.data.msg;
            }
        })
        .catch((err) => {
            ErrorSwall.fire({
                title: "Error",
                text: "No se pudo agregar el contacto",
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        });
        LoadingSwall.close();
        if(error){
            ErrorSwall.fire({
                title: "Error",
                text: errorMsg,
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        }
        else{
        toastMixin.fire({
            icon: "success",
            title: "Contacto agregado",
            showConfirmButton: false,
            timer: 2500,
        });
        }
    }
}


const addContacto = (contacto: any): types => ({
    type: "[Contacto] addContacto",
    payload: contacto,
});

////////////////////////////////////////////////////////////////////////////////////

export const setResponseOk = (payload:boolean): types => ({
    type: "[Contacto] setResponseOk",
    payload: payload,
});

export const setActiveContacto = (payload:any): types => ({
    type: "[Contacto] setActiveContacto",
    payload: payload,
});

export const clearActiveContacto = (): types => ({
    type: "[Contacto] cleanActiveContacto",
});