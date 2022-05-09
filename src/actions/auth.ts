import { reqInsConToken, reqInsSinToken } from "../helpers/axios";
import { types } from "../types/types";
import { User } from "../interface/User";
import Swal from "sweetalert2";

export const startLogin = (userName: string, password: string) => {
  return async (dispatch: any) => {
    await reqInsSinToken
      .post("/auth", {
        userName,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "token-init-date",
          new Date().getTime().toString()
        );
        dispatch(
          login({
            uid: res.data.uid,
            name: res.data.name,
            area: res.data.area,
          })
        );
      })
      .catch((err) => {
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Te has equivocado de usuario o contraseña",
          timer: 2000,
        });
      });
  };
};

export const starChecking = () => {
  return async (dispatch: any) => {
    await reqInsConToken
      .get("/auth/renew")
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "token-init-date",
          new Date().getTime().toString()
        );
        dispatch(
          login({
            uid: res.data.uid,
            name: res.data.name,
            area: res.data.area,
          })
        );
      })
      .catch(async(err) => {
        dispatch(startLogout());
        dispatch(checkingFinish());
      });
  };
};


export const startRenew = () => {
  return async (dispatch: any) => {
    await reqInsConToken
      .get("/auth/renew")
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "token-init-date",
          new Date().getTime().toString()
        );
        dispatch(
          login({
            uid: res.data.uid,
            name: res.data.name,
            area: res.data.area,
          })
        );
      })
      .catch(async(err) => {
        dispatch(startLogout());
      });
  };
};


export const tokenIsValid = () =>{
  return async (dispatch: any) => {
    await reqInsConToken
      .get("/auth/renew")
      .then((res) => {return})
      .catch(async(err) => {
        dispatch(startLogout());
        dispatch(checkingFinish());
      });
  };
}

const checkingFinish = ():types => ({
    type: "[auth] Finish checking",
})

export const startLogout = () => {
  return (dispatch: any) => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    localStorage.clear();
    dispatch(logout());
    dispatch(deleteInfo());
    dispatch(deleteAcuerdos());
  };
};

const logout = (): types => ({
  type: "[auth] Logout",
});

const deleteInfo = (): types => ({
  type: "[info] reset",
});


const deleteAcuerdos = (): types => ({
  type: "[Acuerdo] clearAcuerdos",
});
const login = (user: User): types => ({
  type: "[auth] Login",
  payload: user,
});
