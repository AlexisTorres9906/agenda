import { User } from "../interface/User";
import { Area } from '../interface/Areas';

export type types =
  | { type: "[Admin] getUsers"; payload: User[] }
  | { type: "[Admin] getAreas"; payload: Area[] }
  | { type: "[Admin] addUser"; payload: User }
  | { type: "[Admin] updateUser"; payload: any }
  | { type: "[Admin] changeUserResOk"; payload: boolean }
  | { type: "[Admin] setActiveUser"; payload: User }
  | { type: "[Admin] cleanActiveUser" }
  | { type: "[Admin] clearAdmin" }
  | { type: "[auth] Checking login state" }
  | { type: "[auth] Finish checking" }
  | { type: "[auth] Start login" }
  | { type: "[auth] Login"; payload: User }
  | { type: "[auth] Start Register" }
  | { type: "[auth] Start token renew" }
  | { type: "[auth] Logout" }
  | { type: "[ui] startLoading" }
  | { type: "[ui] stopLoading" };
