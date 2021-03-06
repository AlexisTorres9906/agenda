
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

////7//////////////////////////////////////////////////////////////////////////////////
export const startEditContacto = (contacto: any, id:String) =>{
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    return async (dispatch: any) => {
        await reqInsConToken
        .put("/contacto", contacto,{params:{id}})
        .then((res) => {
            if(res.data.ok){
                dispatch(editContacto(res.data.contacto));
                dispatch(setResponseOk(true));
            }else{
                error = true;
                errorMsg = res.data.msg;
            }
        })
        .catch((err) => {
            ErrorSwall.fire({
                title: "Error",
                text: "No se pudo editar el contacto",
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
            title: "Contacto editado",
            showConfirmButton: false,
            timer: 2500,
        });
        }
    }
}

export const editContacto = (contacto: any): types => ({
    type: "[Contacto] updateContacto",
    payload: contacto,
});

////////////////////////////////////////////////////////////////////////////////////
export const startDeleteContacto = (id: String) =>{
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    return async (dispatch: any) => {
        await reqInsConToken
        .delete("/contacto",{params:{id}})
        .then((res) => {
            if(res.data.ok){
                dispatch(deleteContacto(id));
                dispatch(setResponseOk(true));
            }else{
                error = true;
                errorMsg = res.data.msg;
            }
        })
        .catch((err) => {
            ErrorSwall.fire({
                title: "Error",
                text: "No se pudo eliminar el contacto",
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
            title: "Contacto eliminado",
            showConfirmButton: false,
            timer: 2500,
        });
        }
    }
}

const deleteContacto = (id: String): types => ({
    type: "[Contacto] deleteContacto",
    payload: id,
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
