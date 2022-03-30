import { types } from "../types/types";
import { Auth } from '../interface/Auth';

const initialState: Auth = {
  checking: true,
  uid: null,
  name: null,
};

export const authReducer = (state = initialState, action: types): Auth => {
  switch (action.type) {
    case "[auth] Login":
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    case "[auth] Finish checking" :
      return {
        ...state,
        checking: false,
      };
    case "[auth] Logout":
      return {
        ...state,
        uid: null,
        name: null,
      };
    default:
      return state;
  }
};
