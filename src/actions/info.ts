import { reqInsConToken } from "../helpers/axios";
import { ErrorSwall } from "../helpers/swalls";
import { types } from "../types/types";

///////////////////////////////////////////////////////////////////////////////
export const startGetCategorias = ()=> {
    
    return async (dispatch: any) => {
      await reqInsConToken
        .get("/info/category")
        .then((res) => {
          dispatch(getCategorias(res.data.categorias));
        })
        .catch((err) => {ErrorSwall.fire();});
    };
  
}

const getCategorias = (categorias:any): types => ({
  type: "[info] getCategorias",
  payload: categorias,
});

///////////////////////////////////////////////////////////////////////////////
export const startGetAmbitos = ()=> {
    return async (dispatch: any) => {
      await reqInsConToken
        .get("/info/scope")
        .then((res) => {
        
          dispatch(getAmbitos(res.data.ambitos));
        })
        .catch((err) => {ErrorSwall.fire();});
    };
  }

const getAmbitos = (ambitos:any): types => ({
  type: "[info] getAmbitos",
  payload: ambitos,
});

///////////////////////////////////////////////////////////////////////////////