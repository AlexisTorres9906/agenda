
import { reqInsConToken } from "../helpers/axios";
import { ErrorSwall } from "../helpers/swalls";
import { types } from "../types/types";


////////////////////////////////////////////////////////////////////////////////
export const startGetAcuerdos = ()=> {
    return async (dispatch: any) => {
        await reqInsConToken
            .get("/acuerdo")
            .then((res) => {
                dispatch(getAcuerdos(res.data.acuerdos));
            }
            )
            .catch((err) => {
                ErrorSwall.fire({
                    title: "Error",
                    text: "No se pudo obtener los acuerdos",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                })
            });
    }
}

const getAcuerdos = (acuerdos:any): types => ({
    type: "[Acuerdo] getAcuerdos",
    payload: acuerdos,
});


////////////////////////////////////////////////////////////////////////////////