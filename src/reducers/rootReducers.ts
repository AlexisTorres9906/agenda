import { combineReducers } from "redux";
import { acuerdoReducer } from "./acuerdoReducer";
import { adminReducer } from "./adminReducer";
import { authReducer } from './authReducer';
import { contactosReducer } from "./contactosReducer";
import { infoReducer } from "./infoReducer";
import { solicitudReducer } from "./solicitudReducer";
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
  auth :authReducer,
  ui: uiReducer,
  admin: adminReducer,
  info: infoReducer,
  acuerdos: acuerdoReducer,
  contactos: contactosReducer,
  solicitudes: solicitudReducer
});
