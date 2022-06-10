import { User } from "../interface/User";
import { Area } from "../interface/Areas";
import { Categorias, Ambito } from "../interface/Admin";
import { Acuerdo, AcuerdoAgenda } from "../interface/Acuerdos";

export type types =
  | { type: "[Acuerdo] getAcuerdos"; payload: Acuerdo[] }
  | { type: "[Acuerdo] addAcuerdo"; payload: Acuerdo }
  | {
      type: "[Acuerdo] updateAcuerdoL";
      payload: {
        acuerdoP: Acuerdo;
        acuerdo: Acuerdo;
      };
      id: string;
    }
  | { type: "[Acuerdo] setActiveAcuerdo"; payload: Acuerdo }
  | { type: "[Acuerdo] getAcuerdosAgenda"; payload: AcuerdoAgenda[] }
  | { type: "[Acuerdo] clearActiveAcuerdo" }
  | { type: "[Acuerdo] clearAcuerdos" }
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
  | { type: "[Admin] cleanActiveArea" }
  | { type: "[Admin] setActiveCategory"; payload: Categorias }
  | { type: "[Admin] cleanActiveCategory" }
  | { type: "[Admin] getCategorias"; payload: any }
  | { type: "[Admin] addCategory"; payload: Categorias }
  | { type: "[Admin] updateCategory"; payload: any }
  | { type: "[Admin] deleteCategory"; payload: String }
  | { type: "[Admin] getAmbitos"; payload: any }
  | { type: "[Admin] addAmbito"; payload: Ambito }
  | { type: "[Admin] updateAmbito"; payload: any }
  | { type: "[Admin] deleteAmbito"; payload: String }
  | { type: "[Admin] setActiveAmbito"; payload: Ambito }
  | { type: "[Admin] cleanActiveAmbito" }
  | { type: "[auth] Checking login state" }
  | { type: "[auth] Finish checking" }
  | { type: "[auth] Start login" }
  | { type: "[auth] Login"; payload: User }
  | { type: "[auth] Start Register" }
  | { type: "[auth] Start token renew" }
  | { type: "[auth] Logout" }
  | { type: "[info] getCategorias"; payload: any }
  | { type: "[info] getAmbitos"; payload: any }
  | { type: "[info] getFolioA"; payload: any }
  | { type: "[info] reset" }
  | { type: "[ui] startLoading" }
  | { type: "[ui] stopLoading" }
  | { type: "[Contacto] getContactos"; payload: any }
  | { type: "[Contacto] addContacto"; payload: any }
  | { type: "[Contacto] updateContacto"; payload: any }
  | { type: "[Contacto] deleteContacto"; payload: any }
  | { type: "[Contacto] setActiveContacto"; payload: any }
  | { type: "[Contacto] cleanActiveContacto" }
  | { type: "[Contacto] clearContactos" }
  | { type: "[Contacto] setResponseOk"; payload: boolean }

