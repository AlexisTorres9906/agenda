import { Area } from "./Areas";
import { User } from "./User";

export interface Admin{
     UserTab:{
          Users: User[];
          Areas: Area[];
          ResponseOk: boolean;
          ActiveUser: any
     };
}