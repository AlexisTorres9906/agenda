import { Area } from "./Areas";
import { User } from "./User";

export interface Admin{
     admInformation:{
          Users: User[];
          Areas: Area[];
          Categorias: Categorias[];
          ResponseOk: boolean;
          ActiveUser: any;
          ActiveArea?: Area ;
          ActiveCategory?: Categorias;
     };
}

export interface Categorias{
     _id: string;
     nombre: string;
}