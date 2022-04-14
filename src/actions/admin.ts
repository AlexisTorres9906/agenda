import { reqInsConToken } from "../helpers/axios";
import { startLogout } from "./auth";
import { User } from "../interface/User";
import { types } from "../types/types";
import { Area } from "../interface/Areas";
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
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Usuario creado",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startUpdateUser = (user: object) => {
  return async (dispatch: any) => {
    let error = false;
    LoadingSwall.fire();
    await reqInsConToken
      .put("/admin/usuario", user)
      .then((res) => {
        if (res.data.ok) {
          dispatch(updateUser(res.data.user));
          dispatch(changeUserResOk(true));
        } else {
          error = true;
        }
      })
      .catch((err) => {});
    LoadingSwall.close();
    if (error) {
      ErrorSwall.fire({
        text: "No se pudo actualizar el usuario",
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Usuario actualizado",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

const updateUser = (user: object): types => ({
  type: "[Admin] updateUser",
  payload: user,
});

//////////////////////////////////////////////////////////////////////////////////////////////////

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
export const startDeleteUser = () => {
  return async (dispatch: any,getState:any) => {
    let error = false;
    const {uid} = getState().admin.admInformation.ActiveUser;
    LoadingSwall.fire();
    await reqInsConToken
      .delete(`/admin/usuario/`, { params: { uid: uid } })
      .then((res) => {
        if (res.data.ok) {
          dispatch(deleteUser(uid));
          dispatch(changeUserResOk(true));
        } else {
          error = true;
        }
      })
      .catch((err) => {});
    LoadingSwall.close();
    if (error) {
      ErrorSwall.fire({
        text: "No se pudo eliminar el usuario",
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Usuario eliminado",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

const deleteUser = (uid: string): types => ({
  type: "[Admin] deleteUser",
  payload: uid,
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
export const setActiveArea = (area: Area): types => ({
  type: "[Admin] setActiveArea",
  payload: area,
});

export const cleanActiveArea = (): types => ({
  type: "[Admin] cleanActiveArea",
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
