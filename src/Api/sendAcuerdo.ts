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
        data = res.data.acuerdo;
        toastMixin.fire({
          icon: "success",
          title: "Acuerdo Actualizado Exitosamente",
          text: `El acuerdo ${res.data.acuerdo.nombre} ha sido actualizado con el folio ${res.data.acuerdo.folio}`,
          timer: 5000,
        });
      } else {
        ErrorSwall.fire();
      }
    })
    .catch((err) => {
      console.log(err);
      
      ErrorSwall.fire();
    });
  return data;
}
