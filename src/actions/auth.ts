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
          })
        );
      })
      .catch((err) => {
        dispatch(checkingFinish());
      });
  };
};

const checkingFinish = ():types => ({
    type: "[auth] Finish checking",
})

export const startLogout = () => {
  return (dispatch: any) => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    dispatch(logout());
  };
};

const logout = (): types => ({
  type: "[auth] Logout",
});

const login = (user: User): types => ({
  type: "[auth] Login",
  payload: user,
});
