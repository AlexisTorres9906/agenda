import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { authReducer } from './authReducer';
import { infoReducer } from "./infoReducer";
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
  auth :authReducer,
  ui: uiReducer,
  admin: adminReducer,
  info: infoReducer
});
