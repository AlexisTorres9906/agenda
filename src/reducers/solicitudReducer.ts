import { Solicitud } from "../interface/Solicitud";
import { types } from "../types/types";

const initialState: Solicitud[]  = [] as Solicitud[]

export const solicitudReducer = (
  state = initialState,
  action: types
): Solicitud[] => {
  switch (action.type) {
    case "[Solicitud] getSolicitudes":
      return action.payload;

    case "[Solicitud] clearSolicitudes":
      return initialState;

    case "[Solicitud] aceptarSolicitud":
      return state.filter((solicitud: Solicitud) => {
        return solicitud._id !== action.payload._id;
      }
      );
    case "[Solicitud] rechazarSolicitud":
      return state.filter((solicitud: Solicitud) => {
        return solicitud._id !== action.payload._id;
      });

    default:
      return state;
  }
};
