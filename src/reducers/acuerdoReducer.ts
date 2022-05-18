import { Acuerdo } from "../interface/Acuerdos";
import { types } from "../types/types";

interface AcuerdoState {
  acuerdos: Acuerdo[];
  activeAcuerdo?: Acuerdo;
}

const initialState: AcuerdoState = {
  acuerdos: [],
};

const cambiarDatos = (objeto: Acuerdo, action: any) => {
  if (!objeto) return; // null object
  if (objeto._id === action.id) {
    return action.payload;
  } else if (
    objeto.compromiso != (undefined || null) &&
    objeto!.compromiso.length > 0
  ) {
    return {
      ...objeto,
      compromiso: revisarHijos(objeto.compromiso, action)
    };

  }
  return objeto;
};

const revisarHijos = (objeto: Acuerdo[], action: any) => {
  if (!objeto) return; // null object
  return objeto.map((item) => {
    if (item._id === action.id) {
      return action.payload;
    } else if (
      item.compromiso != (undefined || null) &&
      item!.compromiso.length > 0
    ) {
      revisarHijos(item.compromiso, action);
    }
    else return item;
  }
  );
}


export const acuerdoReducer = (
  state = initialState,
  action: types
): AcuerdoState => {
  switch (action.type) {
    case "[Acuerdo] getAcuerdos":
      return {
        ...state,
        acuerdos: action.payload,
      };
    case "[Acuerdo] clearAcuerdos":
      return {
        ...state,
        acuerdos: [],
      };
    case "[Acuerdo] addAcuerdo":
      return {
        ...state,
        acuerdos: [...state.acuerdos, action.payload],
      };
    case "[Acuerdo] setActiveAcuerdo":
      return {
        ...state,
        activeAcuerdo: action.payload,
      };
    case "[Acuerdo] clearActiveAcuerdo":
      return {
        ...state,
        activeAcuerdo: undefined,
      };
    case "[Acuerdo] updateAcuerdoL":
      return {
        ...state,
        acuerdos: state.acuerdos.map((acuerdo: Acuerdo) =>
          cambiarDatos(acuerdo, action)
        ),
        activeAcuerdo: action.payload,
      };
    default:
      return state;
  }
};
