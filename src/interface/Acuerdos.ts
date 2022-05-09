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
    uIntervensores?: Usuarios[] | null;
    lugar: string;
    fechaCreacion: Date;
    fechaInstruccion?: Date | null;
    fechaPCierre?: Date | null;
    fechaIEjecucion?: Date | null;
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
    area: string;
  }
  export interface Area {
    _id: string;
    nombre: string;
    nombreCorto: string;
  }
  