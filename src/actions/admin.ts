import { reqInsConToken } from "../helpers/axios";
import { User } from "../interface/User";
import { types } from "../types/types";
import { Area } from "../interface/Areas";
import { ErrorSwall, toastMixin, LoadingSwall } from "../helpers/swalls";
import { Ambito } from '../interface/Admin';


//////////////////////////////////////////////////////////////////////////////////////////////////
export const startGetUsers = () => {
  return async (dispatch: any) => {
    await reqInsConToken
      .get("/admin/usuarios")
      .then((res) => {
        dispatch(getUsers(res.data.usuariosR));
      })
      .catch((err) => {
        ErrorSwall.fire();
      });
  };
};

const getUsers = (users: User[]): types => ({
  type: "[Admin] getUsers",
  payload: users,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const startAddUser = (user: any) => {
  return async (dispatch: any) => {
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    await reqInsConToken
      .post("/auth/new", user)
      .then((res) => {
        if (!res.data.ok) {
          error = true;
          errorMsg = res.data.msg;
        } else {
          delete res.data.ok;
          delete res.data.token;
          dispatch(addUser(res.data));
          dispatch(changeResponseOK(true));
        }
      })
      .catch((err) => {
        ErrorSwall.fire();
      });
    LoadingSwall.close();
    if (error) {
      toastMixin.fire({
        icon: "error",
        title: "Error al crear el usuario",
        text: `Razon: ${errorMsg}`,
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Usuario creado",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startUpdateUser = (user: object) => {
  return async (dispatch: any) => {
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    await reqInsConToken
      .put("/admin/usuario", user)
      .then((res) => {
        if (res.data.ok) {
          dispatch(updateUser(res.data.user));
          dispatch(changeResponseOK(true));
        } else {
          error = true;
          errorMsg = res.data.msg;
        }
      })
      .catch((err) => {ErrorSwall.fire();});
    LoadingSwall.close();
    if (error) {
      ErrorSwall.fire({
        text: `No se pudo actualizar el usuario,
        Causa: ${errorMsg}`,
        timer: 3000,
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Usuario actualizado",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

const updateUser = (user: object): types => ({
  type: "[Admin] updateUser",
  payload: user,
});

//////////////////////////////////////////////////////////////////////////////////////////////////

export const addUser = (user: User): types => ({
  type: "[Admin] addUser",
  payload: user,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const setActiveUser = (user: User): types => ({
  type: "[Admin] setActiveUser",
  payload: user,
});

export const cleanActiveUser = (): types => ({
  type: "[Admin] cleanActiveUser",
});

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startDeleteUser = () => {
  return async (dispatch: any,getState:any) => {
    let error = false;
    const {uid} = getState().admin.admInformation.ActiveUser;
    LoadingSwall.fire();
    await reqInsConToken
      .delete(`/admin/usuario/`, { params: { uid: uid } })
      .then((res) => {
        if (res.data.ok) {
          dispatch(deleteUser(uid));
          dispatch(changeResponseOK(true));
        } else {
          error = true;
        }
      })
      .catch((err) => {ErrorSwall.fire();});
    LoadingSwall.close();
    if (error) {
      ErrorSwall.fire({
        text: "No se pudo eliminar el usuario",
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Usuario eliminado",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

const deleteUser = (uid: string): types => ({
  type: "[Admin] deleteUser",
  payload: uid,
});

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startGetAreas = ()=> {

  //create promise
  return async (dispatch: any) => {
    await reqInsConToken
      .get("/admin/area")
      .then((res) => {
        dispatch(getAreas(res.data.areas));
      })
      .catch((err) => {ErrorSwall.fire();});
  };
 
};

const getAreas = (areas: Area[]): types => ({
  type: "[Admin] getAreas",
  payload: areas,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const startAddArea = (area: any) => {
  return async (dispatch: any) => {
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    await reqInsConToken
      .post("/admin/area", area)
      .then((res) => {
        if (!res.data.ok) {
          error = true;
          errorMsg = res.data.msg;
        } else {
          delete res.data.ok;
          dispatch(addArea(res.data.area));
          dispatch(changeResponseOK(true));
        }
      })
      .catch((err) => {
        ErrorSwall.fire();
      });
    LoadingSwall.close();
    if (error) {
      toastMixin.fire({
        icon: "error",
        title: "Error al crear el area",
        text: `Razon: ${errorMsg}`,
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Area creada",
        icon: "success",
        timer: 2000,
      });
    }
  };
};
const addArea = (area: Area): types => ({
  type: "[Admin] addArea",
  payload: area,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const startUpdateArea = (id:string, area: object) => {
  return async (dispatch: any) => {
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    await reqInsConToken
      .put('/admin/area/',area,{params:{id:id}})
      .then((res) => {
        if (res.data.ok) {
          dispatch(updateArea(res.data.area));
          dispatch(changeResponseOK(true));
        } else {
          error = true;
          errorMsg = res.data.msg;
        }
      })
      .catch((err) => {ErrorSwall.fire();});
    LoadingSwall.close();
    if (error) {
      ErrorSwall.fire({
        text: `No se pudo actualizar el area,
        Causa: ${errorMsg}`,
        timer: 3000,
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Area actualizada",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

const updateArea = (area: Area): types => ({
  type: "[Admin] updateArea",
  payload: area,
});

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startDeleteArea = (id: string) => {
  return async (dispatch: any) => {
    let error = false;
    LoadingSwall.fire();
    await reqInsConToken
      .delete(`/admin/area/`, { params: { id: id } })
      .then((res) => {
        if (res.data.ok) {
          dispatch(deleteArea(id));
          dispatch(changeResponseOK(true));
        } else {
          error = true;
        }
      })
      .catch((err) => {ErrorSwall.fire();});
    LoadingSwall.close();
    if (error) {
      ErrorSwall.fire({
        text: "No se pudo eliminar el area",
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Area eliminada",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

const deleteArea = (id: string): types => ({
  type: "[Admin] deleteArea",
  payload: id,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const setActiveArea = (area: Area): types => ({
  type: "[Admin] setActiveArea",
  payload: area,
});

export const cleanActiveArea = (): types => ({
  type: "[Admin] cleanActiveArea",
});


//////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////
export const startAddCategoria = (categoria: any) => {
  return async (dispatch: any) => {
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    await reqInsConToken
      .post("/admin/categoria", categoria)
      .then((res) => {
        if (!res.data.ok) {
          error = true;
          errorMsg = res.data.msg;
        } else {
          delete res.data.ok;
          dispatch(addCategoria(res.data.categoria));
          dispatch(changeResponseOK(true));
        }
      })
      .catch((err) => {
        ErrorSwall.fire();
      });
    LoadingSwall.close();
    if (error) {
      toastMixin.fire({
        icon: "error",
        title: "Error al crear la categoria",
        text: `Razon: ${errorMsg}`,
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Categoria creada",
        icon: "success",
        timer: 2000,
      });
    }
  };
};
const addCategoria = (categoria: any): types => ({
  type: "[Admin] addCategory",
  payload: categoria,
});

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startUpdateCategoria = (id:string, categoria: object) => {
  return async (dispatch: any) => {
    let error = false;
    let errorMsg = "";
    LoadingSwall.fire();
    await reqInsConToken
      .put('/admin/categoria/',categoria,{params:{id:id}})
      .then((res) => {
        if (res.data.ok) {
          dispatch(updateCategoria(res.data.categoria));
          dispatch(changeResponseOK(true));
        } else {
          error = true;
          errorMsg = res.data.msg;
        }
      })
      .catch((err) => {
        ErrorSwall.fire();
      });
    LoadingSwall.close();
    if (error) {
      ErrorSwall.fire({
        text: `No se pudo actualizar la categoria,
        Causa: ${errorMsg}`,
        timer: 3000,
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Categoria actualizada",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

const updateCategoria = (categoria: any): types => ({
  type: "[Admin] updateCategory",
  payload: categoria,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const startDeleteCategoria = (id: string) => {
  return async (dispatch: any) => {
    let error = false;
    LoadingSwall.fire();
    await reqInsConToken
      .delete(`/admin/categoria/`, { params: { id: id } })
      .then((res) => {
        if (res.data.ok) {
          dispatch(deleteCategoria(id));
          dispatch(changeResponseOK(true));
        } else {
          error = true;
        }
      })
      .catch((err) => {ErrorSwall.fire();});
    LoadingSwall.close();
    if (error) {
      ErrorSwall.fire({
        text: "No se pudo eliminar la categoria",
      });
    } else {
      toastMixin.fire({
        title: "Exito",
        text: "Categoria eliminada",
        icon: "success",
        timer: 2000,
      });
    }
  };
};

const deleteCategoria = (id: string): types => ({
  type: "[Admin] deleteCategory",
  payload: id,
});
//////////////////////////////////////////////////////////////////////////////////////////////////
export const setActiveCategory = (category: any): types => ({
  type: "[Admin] setActiveCategory",
  payload: category,
});

export const cleanActiveCategory = (): types => ({
  type: "[Admin] cleanActiveCategory",
});


//////////////////////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startAddAmbito = (ambito:Ambito) => {
    return async (dispatch:any) =>{
      LoadingSwall.fire();
      let error = false;
      let errorMsg = "";
      await reqInsConToken.post('/admin/scope',ambito)
      .then((res)=>{
        if(!res.data.ok){
          error = true;
          errorMsg = res.data.msg;
        }
        else{
          delete res.data.ok;
          dispatch(addAmbito(res.data.ambito));
          dispatch(changeResponseOK(true));
        }
      }).catch((err)=>{ErrorSwall.fire();});
      LoadingSwall.close();
      if(error){
        ErrorSwall.fire({
          text:`No se pudo crear el ambito,
          Causa: ${errorMsg}`,
          timer:3000
        });
      }else{
        toastMixin.fire({
          title:"Exito",
          text:"Ambito creado",
          icon:"success",
          timer:2000
        });
      }
  }
}

const addAmbito = (ambito:Ambito):types => ({
  type: "[Admin] addAmbito",
  payload: ambito,
});

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startUpdateAmbito = (id:string, ambito:object) => {
  let error = false;
  let errorMsg = "";
  return async (dispatch:any) =>{
    LoadingSwall.fire();
    await reqInsConToken.put('/admin/scope',ambito,{params:{id:id}})
    .then((res)=>{
      if(res.data.ok){
        dispatch(updateAmbito(res.data.ambito));
        dispatch(changeResponseOK(true));
      }else{
        error = true;
        errorMsg = res.data.msg;
      }
    }).catch((err)=>{ErrorSwall.fire();});
    LoadingSwall.close();
    if(error){
      ErrorSwall.fire({
        text:`No se pudo actualizar el ambito,
        Causa: ${errorMsg}`,
        timer:3000
      });
    }else{
      toastMixin.fire({
        title:"Exito",
        text:"Ambito actualizado",
        icon:"success",
        timer:2000
      });
    }
  }
}

const updateAmbito = (ambito:Ambito):types => ({
  type: "[Admin] updateAmbito",
  payload: ambito,
});

//////////////////////////////////////////////////////////////////////////////////////////////////
export const startDeleteAmbito = (id:string) => {
  let error = false;
  LoadingSwall.fire();
  return async (dispatch:any) =>{
    await reqInsConToken.delete('/admin/scope',{params:{id:id}})
    .then((res)=>{
      if(res.data.ok){
        dispatch(deleteAmbito(id));
        dispatch(changeResponseOK(true));
      }else{
        error = true;
      }
    }).catch((err)=>{ErrorSwall.fire();});
    LoadingSwall.close();
    if(error){
      ErrorSwall.fire({
        text:`No se pudo eliminar el ambito`,
        timer:3000
      });
    }else{
      toastMixin.fire({
        title:"Exito",
        text:"Ambito eliminado",
        icon:"success",
        timer:2000
      });
    }
  }
}

const deleteAmbito = (id:string):types => ({
  type: "[Admin] deleteAmbito",
  payload: id,
});

//////////////////////////////////////////////////////////////////////////////////////////////////
export const setActiveAmbito = (ambito:Ambito):types => ({
  type: "[Admin] setActiveAmbito",
  payload: ambito,
});

export const cleanActiveAmbito = ():types => ({
  type: "[Admin] cleanActiveAmbito",
});


//////////////////////////////////////////////////////////////////////////////////////////////////

export const changeResponseOK = (resOk: boolean): types => ({
  type: "[Admin] changeResponseOK",
  payload: resOk,
});


//////////////////////////////////////////////////////////////////////////////////////////////////
export const clearAdmin = (): types => ({
  type: "[Admin] clearAdmin",
});
