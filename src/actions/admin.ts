import { reqInsConToken } from "../helpers/axios";
import { startLogout } from "./auth";
import { User } from '../interface/User';
import { types } from "../types/types";

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
    payload: users
});
