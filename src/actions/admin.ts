import { reqInsConToken, reqInsSinToken } from "../helpers/axios";
import { startLogout } from "./auth";
import { User } from "../interface/User";
import { types } from "../types/types";
import { Area } from "../interface/Areas";
import Swal from "sweetalert2";
import { ErrorSwall, toastMixin, LoadingSwall } from "../helpers/swalls";

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startGetUsers = () => {
  return async (dispatch: any) => {
    await reqInsConToken
      .get("/admin/usuarios")
      .then((res) => {
        dispatch(getUsers(res.data.usuariosR));
      })
      .catch((err) => {
        dispatch(startLogout());
      });
  };
};

const getUsers = (users: User[]): types => ({
  type: "[Admin] getUsers",
  payload: users,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const startGetAreas = () => {
  return async (dispatch: any) => {
    await reqInsConToken
      .get("/admin/area")
      .then((res) => {
        dispatch(getAreas(res.data.areas));
      })
      .catch((err) => {});
  };
};

const getAreas = (areas: Area[]): types => ({
  type: "[Admin] getAreas",
  payload: areas,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const startAddUser = (user: any) => {
  return async (dispatch: any) => {
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    await reqInsConToken
      .post("/auth/new", user)
      .then((res) => {
        if (!res.data.ok) {
          error = true;
          errorMsg = res.data.msg;
        } else {
          delete res.data.ok;
          delete res.data.token;
          dispatch(addUser(res.data));
          dispatch(changeUserResOk(true));
        }
      })
      .catch((err) => {
        ErrorSwall.fire();
      });
    LoadingSwall.close();
    if (error) {
      toastMixin.fire({
        icon: "error",
        title: "Error al crear el usuario",
        text: `Razon: ${errorMsg}`,
      });
    }
  };
};

export const addUser = (user: User): types => ({
  type: "[Admin] addUser",
  payload: user,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const setActiveUser = (user: User): types => ({
  type: "[Admin] setActiveUser",
  payload: user,
});

export const cleanActiveUser = (): types => ({
  type: "[Admin] cleanActiveUser",
});

//////////////////////////////////////////////////////////////////////////////////////////////////

export const changeUserResOk = (resOk: boolean): types => ({
  type: "[Admin] changeUserResOk",
  payload: resOk,
});

//////////////////////////////////////////////////////////////////////////////////////////////////
export const clearAdmin = (): types => ({
  type: "[Admin] clearAdmin",
});
