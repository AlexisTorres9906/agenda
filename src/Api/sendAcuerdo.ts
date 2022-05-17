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
