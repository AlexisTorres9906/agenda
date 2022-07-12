
import { reqInsConToken } from "../helpers/axios";
import { ErrorSwall, LoadingSwall, toastMixin } from "../helpers/swalls";


interface data {
    peticiones: String[];
    acuerdo: String;
}

export const sendSolicitudes = async (solicitudes: data) => {
    LoadingSwall.fire();
    let data:object = {};
    await reqInsConToken
        .post("/solicitud", solicitudes)
        .then((res) => {
        LoadingSwall.close();
        if (res.data.ok) {
            data = res.data;
            toastMixin.fire({
            icon: "success",
            title: "Solicitudes Enviadas Exitosamente",
            text: "Se ha invitado al personal a participar en el acuerdo",
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