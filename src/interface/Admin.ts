import { Area } from "./Areas";
import { User } from "./User";

export interface Admin{
     admInformation:{
          Users: User[];
          Areas: Area[];
          ResponseOk: boolean;
          ActiveUser: any;
          ActiveArea?: Area ;
     };
}