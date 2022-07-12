import { reqInsConToken } from "../helpers/axios";
import { ErrorSwall, LoadingSwall, toastMixin } from "../helpers/swalls";

export const sendAcuerdo = async (acuerdo: object) => {
  LoadingSwall.fire();
  let data:object = {};
  
  await reqInsConToken
    .post("/acuerdo", acuerdo)
    .then((res) => {
      LoadingSwall.close();
      if (res.data.ok) {
        data = res.data.acuerdo;
        toastMixin.fire({
          icon: "success",
          title: "Acuerdo Creado Exitosamente",
          text: `El acuerdo ${res.data.acuerdo.nombre} ha sido creado con el folio ${res.data.acuerdo.folio}`,
          timer: 5000,
        });
      } else {
        ErrorSwall.fire();
      }
    })
    .catch((err) => {
      ErrorSwall.fire();
    });
  return data;
};

export const updateAcuerdo = async (acuerdo: object,id:String) => {
  LoadingSwall.fire();
  let data:object = {};
  await reqInsConToken
    .put("/acuerdo", acuerdo,{
      params: {
        id
      },
    })
    .then((res) => {
      LoadingSwall.close();
      if (res.data.ok) {
        data = res.data;
        toastMixin.fire({
          icon: "success",
          title: "Acuerdo Actualizado Exitosamente",
          text: `El acuerdo ${res.data.acuerdo.nombre} ha sido actualizado con el folio ${res.data.acuerdo.folio}`,
          timer: 5000,
        });
      } else {
        ErrorSwall.fire(
          {
            title: "Error",
            text: `${res.data.msg}`,
            icon: "error",
            confirmButtonText: "Cerrar",
          }

        );
      }
    })
    .catch((err) => {
      ErrorSwall.fire({
        title: "Error",
        text: "No se pudo actualizar el acuerdo, si el acuerdo no te pertenece posiblemente ya no tengas permisos para actualizarlo.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    });
  return data;
}


export const addCompromiso = async (acuerdo: object,id:String) => {
  LoadingSwall.fire();
  let data:object = {};
  await reqInsConToken
    .post("/acuerdo/compromiso", acuerdo,{
      params: {
        id
      },
    })
    .then((res) => {
      LoadingSwall.close();
      if (res.data.ok) {
        data = res.data;
        toastMixin.fire({
          icon: "success",
          title: "Se ha creado el compromiso",
          text: `Se ha creado un compromiso a partir del acuerdo con folio ${res.data.acuerdo.folio}`,
          timer: 5000,
        });
      } else {
        ErrorSwall.fire();
      }
    })
    .catch((err) => {
      ErrorSwall.fire();
    });
  return data;
}

export const desasociarUsuarioAcuerdo = async(id: string, usuario:string) => {
    LoadingSwall.fire();
    let error = false;
    let errorMsg = "";
    let data:object = {};
    await reqInsConToken
      .put("/acuerdo/desasociar",{},{params:{id,usuario}})
      .then((res) => {
        if (res.data.ok) {
          data = {
            acuerdo:res.data.acuerdo,
            acuerdoP:res.data.acuerdoP,
          }
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
                text: "No se pudo desasociar el usuario del acuerdo",
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
                text: "Usuario desasociado del acuerdo",
            });
            }
    return data;
}