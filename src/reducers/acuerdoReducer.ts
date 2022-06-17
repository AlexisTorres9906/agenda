import { Acuerdo, AcuerdoAgenda } from "../interface/Acuerdos";
import { types } from "../types/types";

interface AcuerdoState {
  acuerdos: Acuerdo[];
  activeAcuerdo?: Acuerdo;
  acuerdoAgenda: AcuerdoAgenda[];
  acuerdosImportantes: Acuerdo[];
}

const initialState: AcuerdoState = {
  acuerdos: [],
  acuerdoAgenda: [],
  acuerdosImportantes: [],
};
/*
//esto funciona para entrar a un objeto y actualizar todos los hijos
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

const revisarHijos = (objeto: Acuerdo[], action: any):Acuerdo[] => {
  if (!objeto) return []; // null object
  return objeto.map((item) => {
    if (item._id === action.id) {
      return action.payload;
    } else if (
      item.compromiso != null &&
      item!.compromiso.length > 0
    ) {
      return {
        ...item,
        compromiso: revisarHijos(item.compromiso, action)
      }
    }
    else return item;
  }
  );
}
*/

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
        acuerdoAgenda: [],
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
        acuerdos: state.acuerdos.map((item) => {
            if(item._id === action.payload.acuerdoP._id)
              return action.payload.acuerdoP;
            else return item;
        }
        ),
        activeAcuerdo: action.payload.acuerdo,
        acuerdosImportantes: state.acuerdosImportantes.map((item) => {
          if(item._id === action.payload.acuerdoP._id)
            return action.payload.acuerdoP;
          else return item;
      }
      )
      };
      case "[Acuerdo] getAcuerdosAgenda":
      return {
        ...state,
        acuerdoAgenda: action.payload,
      };
      case "[Acuerdo] getAcuerdosImportantes":
      return {
        ...state,
        acuerdosImportantes: action.payload,
      };
    default:
      return state;
  }
};
