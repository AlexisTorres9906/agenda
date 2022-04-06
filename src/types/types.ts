import { User } from "../interface/User";
import { Area } from '../interface/Areas';

export type types =
  | { type: "[Admin] getUsers"; payload: User[] }
  | { type: "[Admin] getAreas"; payload: Area[] }
  | { type: "[auth] Checking login state" }
  | { type: "[auth] Finish checking" }
  | { type: "[auth] Start login" }
  | { type: "[auth] Login"; payload: User }
  | { type: "[auth] Start Register" }
  | { type: "[auth] Start token renew" }
  | { type: "[auth] Logout" }
  | { type: "[ui] startLoading" }
  | { type: "[ui] stopLoading" };
