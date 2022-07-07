import { reqInsConToken } from "../helpers/axios";
import { ErrorSwall, LoadingSwall, toastMixin } from "../helpers/swalls";
import { types } from "../types/types";
import { addAcuerdo } from "./acuerdo";

export const startGetSolicitudes = () => {
  return async (dispatch: any) => {
    await reqInsConToken
      .get("/solicitud")
      .then((res) => {
        dispatch(getSolicitudes(res.data.solicitudes));
      })
      .catch((err) => {
        ErrorSwall.fire();
      });
  };
};
const getSolicitudes = (solicitudes: any): types => ({
  type: "[Solicitud] getSolicitudes",
  payload: solicitudes,
});

export const startAceptarSolicitud = (id: string) => {
  return async (dispatch: any) => {
    LoadingSwall.fire();
    let error = false;
    let errorMsg = "";
    await reqInsConToken
      .put("/solicitud",{},{params:{id}})
      .then((res) => {
        if (res.data.ok) {
          dispatch(aceptarSolicitud(res.data.solicitud));
          dispatch(addAcuerdo(res.data.acuerdo));
        }
        else {
            error = true;
            errorMsg = res.data.msg;
            }
      })
      .catch((err) => {
        ErrorSwall.fire(
            {
                title: "Error",
                text: "No se pudo aceptar la solicitud inténtelo nuevamente",
                icon: "error",
                confirmButtonText: "Cerrar",
            }
        );
      });
    LoadingSwall.close();
    if (error) {
        ErrorSwall.fire({
            title: "Error",
            text: errorMsg,
            icon: "error",
            confirmButtonText: "Cerrar",
        });
        }
        else{
            toastMixin.fire({
                text: "Solicitud aceptada",
                icon: "success",
                position: "top-right",
                showConfirmButton: false,
                timer: 3000,
            });
        }
  };
};
const aceptarSolicitud = (solicitud: any): types => ({
  type: "[Solicitud] aceptarSolicitud",
  payload: solicitud,
});
