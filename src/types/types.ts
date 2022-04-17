import { User } from "../interface/User";
import { Area } from '../interface/Areas';
import { Categorias } from '../interface/Admin';

export type types =
  | { type: "[Admin] getUsers"; payload: User[] }
  | { type: "[Admin] addUser"; payload: User }
  | { type: "[Admin] updateUser"; payload: any }
  | { type: "[Admin] changeResponseOK"; payload: boolean }
  | { type: "[Admin] setActiveUser"; payload: User }
  | { type: "[Admin] cleanActiveUser" }
  | { type: "[Admin] clearAdmin" }
  | { type: "[Admin] deleteUser"; payload: String }
  | { type: "[Admin] getAreas"; payload: Area[] }
  | { type: "[Admin] addArea"; payload: Area }
  | { type: "[Admin] updateArea"; payload: any }
  | { type: "[Admin] deleteArea"; payload: String }
  | { type: "[Admin] setActiveArea"; payload: Area }
  | { type: "[Admin] cleanActiveArea"}
  | { type: "[Admin] setActiveCategory"; payload: Categorias }
  | { type: "[Admin] cleanActiveCategory" }
  | { type: "[Admin] addCategory"; payload: Categorias }
  | { type: "[Admin] updateCategory"; payload: any }
  | { type: "[Admin] deleteCategory"; payload: String }
  | { type: "[auth] Checking login state" }
  | { type: "[auth] Finish checking" }
  | { type: "[auth] Start login" }
  | { type: "[auth] Login"; payload: User }
  | { type: "[auth] Start Register" }
  | { type: "[auth] Start token renew" }
  | { type: "[auth] Logout" }
  | { type: "[info] getCategorias", payload: any }
  | { type: "[ui] startLoading" }
  | { type: "[ui] stopLoading" };
