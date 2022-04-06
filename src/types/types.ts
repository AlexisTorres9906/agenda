import { User } from "../interface/User";

export type types =
  | { type: "[Admin] getUsers"; payload: User[] }
  | { type: "[auth] Checking login state" }
  | { type: "[auth] Finish checking" }
  | { type: "[auth] Start login" }
  | { type: "[auth] Login"; payload: User }
  | { type: "[auth] Start Register" }
  | { type: "[auth] Start token renew" }
  | { type: "[auth] Logout" }
  | { type: "[ui] startLoading" }
  | { type: "[ui] stopLoading" };
