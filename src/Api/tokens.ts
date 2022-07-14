import { reqInsConToken } from "../helpers/axios";
import { ErrorSwall, LoadingSwall, toastMixin } from "../helpers/swalls";

export const generarToken = async () => {
  await reqInsConToken
    .get("/admin/token", {})
    .then((res) => {
      if (res.data.ok) {
        return true;
      } else {
        ErrorSwall.fire();
        return false;
      }
    })
    .catch((err) => {
      ErrorSwall.fire();
    });
  return false;
};

export const validarToken = async (token: string) => {
  await reqInsConToken
    .post("/admin/token/validate", { token })
    .then((res) => {
      if (res.data.ok) {
        return true;
      } else {
        toastMixin.fire({
          title: "Error",
          text: "El token no es valido",
          icon: "error",
        });
        return false;
      }
    })
    .catch((err) => {
        toastMixin.fire();
    });
  return false;
};

///cambiar contraseña
export const cambiarContraseña = async (token: string, password: string) => {
  LoadingSwall.fire();
  await reqInsConToken
    .put("/admin/password/admin", {
      token,
      password,
    })
    .then((res) => {
      LoadingSwall.close();
      if (res.data.ok) {
        toastMixin.fire({
            title: "Contraseña Cambiada",
            text: "La contraseña ha sido cambiada con exito",
            icon: "success",
            });
        return true;
      } else {
        toastMixin.fire({
          title: "Error",
          text: "Ha ocurrido un error inesperado, posiblemente el token no es valido, por favor intente nuevamente",
          icon: "error",
        });
        return false;
      }
    })
    .catch((err) => {
        toastMixin.fire({
        title: "Error",
        text: "Ha ocurrido un error inesperado, posiblemente el token no es valido, por favor intente nuevamente",
        icon: "error",
      });
    });

  return false;
};
