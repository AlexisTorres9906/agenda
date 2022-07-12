import { Contacto } from './Contacto';
export interface Acuerdo {
    _id: string;
    folio: string;
    nombre: string;
    descripcion: string;
    estatus: string;
    compromiso?: Acuerdo[] | null;
    prioridad: string;
    categoria: CategoriaOrAmbito;
    ambito: CategoriaOrAmbito;
    responsable: Usuarios;
    area: Area;
    intervensores?: Contacto[] | null; 
    uIntervensores?: Usuarios[] | null;
    lugar: string;
    fechaCreacion: Date;
    fechaInstruccion?: Date | null;
    fechaPCierre?: Date | null;
    fechaIEjecucion?: Date | null;
    fechaRCierre?: Date | null;
    resultado: string | null;
    acuerdoMayor: Acuerdo | null;
  }
  export interface CategoriaOrAmbito {
    _id: string;
    nombre: string;
  }
  export interface Usuarios {
    _id: string;
    name: string;
    userName: string;
    password: string;
    area: Area;
  }
  export interface Area {
    _id: string;
    nombre: string;
    nombreCorto: string;
  }
  
  export interface AcuerdoAgenda {
    _id: string;
    Id: string;
    Subject: string;
    StartTime?: Date;
    EndTime?: Date;
    Description: string;
    Responsable: string;
    Prioridad: string;
  }