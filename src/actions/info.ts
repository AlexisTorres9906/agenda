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
export const startGetFolioA = ()=> {
    return async (dispatch: any) => {
      await reqInsConToken
        .get("/info/folio")
        .then((res) => {
          dispatch(getFolioA(res.data.folio));
        })
        .catch((err) => {ErrorSwall.fire();});
    };
  }

  const getFolioA = (folioA:any): types => ({
    type: "[info] getFolioA",
    payload: folioA,
  });

///////////////////////////////////////////////////////////////////////////////

export const startGetUsuarios = ()=> {
    return async (dispatch: any) => {
      await reqInsConToken
        .get("/info/users")
        .then((res) => {
          dispatch(getUsuarios(res.data.usuarios));
        })
        .catch((err) => {ErrorSwall.fire();});
    };
  }

  const getUsuarios = (usuarios:any): types => ({
    type: "[info] getUsuarios",
    payload: usuarios,
  });

  /////////////////////////////////////////////////////////////////////////////
  export const startGetConteo = ()=> {
    return async (dispatch: any) => {
      await reqInsConToken
        .get("/info/count")
        .then((res) => {
          dispatch(getConteo(res.data.conteo));
        })
        .catch((err) => {ErrorSwall.fire();});
    };
  }

  const getConteo = (conteo:any): types => ({ 
    type: "[Info] getConteo",
    payload: conteo,
  });
