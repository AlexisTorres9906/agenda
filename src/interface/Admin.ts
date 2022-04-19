import { Area } from "./Areas";
import { User } from "./User";

export interface Admin{
     admInformation:{
          Users: User[];
          Areas: Area[];
          Ambitos : Ambito[];
          Categorias: Categorias[];
          ResponseOk: boolean;
          ActiveUser: any;
          ActiveArea?: Area ;
          ActiveCategory?: Categorias;
          ActiveAmbito?: Ambito;
     };
}

export interface Categorias{
     _id: string;
     nombre: string;
}

export interface Ambito{
     _id: string;
     nombre: string;
}