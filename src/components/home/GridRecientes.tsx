/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  GridComponent,
  Inject,
  Page,
  ColumnModel,
} from "@syncfusion/ej2-react-grids";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  clearActiveAcuerdo,
  setActiveAcuerdo,
  startGetAcuerdosImportantes,
  updateAcuerdoL,
} from "../../actions/acuerdo";
import { Acuerdo } from "../../interface/Acuerdos";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import { CambiarFAcuerdo } from "../verAcuerdos/CambiarFAcuerdo";
import { EnProceso } from "../verAcuerdos/EnProceso";
import { Finalizado } from "../verAcuerdos/Finalizado";
import { updateAcuerdo } from "../../Api/sendAcuerdo";
import { startRenew } from "../../actions/auth";
import Swal from "sweetalert2";
import { styleModalContactoVacuerdo, styleModalInfo } from "../../helpers/stylesModal";
import { IoIosContacts, IoMdContacts } from "react-icons/io";
import { ContactosAcuerdo } from "../verAcuerdos/ContactosAcuerdo";
import { PersonalAcuerdo } from "../verAcuerdos/PersonalAcuerdo";
import { AgregarPersonal } from "../verAcuerdos/AgregarPersonal";
export const GridRecientes = () => {
  const { acuerdosImportantes, activeAcuerdo } = useSelector(
    (state: RootState) => state.acuerdos
  );
  const { uid } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState({});
  const hoy = useRef(new Date());
  const hoysh = useRef(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [openModalContactos, setOpenModalContactos] = useState(false);
  const navigate = useNavigate();
  const styleModalContactos = styleModalContactoVacuerdo;
  let gridInstance: GridComponent | null = null;
  const filterOptions: any = { type: "Excel" };
  //manana
  const manana = useRef(new Date());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetAcuerdosImportantes());
  }, [dispatch]);

  ////////////////////////////////////////
  const style = styleModalInfo;
  //logica del grid
  let loc = { width: "31px", height: "24px" };
  const prioTemplate = (props: any) => {
    
    var prioridad =
      props.prioridad === "Baja"
        ? "https://i.ibb.co/LQS15vD/baja.png"
        : props.prioridad === "Media"
        ? "https://i.ibb.co/YhJvy06/media2.png"
        : "https://i.ibb.co/zskVDGf/alta.png";
    return (
      <div>
        <img style={loc} src={prioridad} alt="" />
        <span id="prioridad">{props.prioridad}</span>
      </div>
    );
  };

  const columns:ColumnModel[]  = [
    {
      field: "id",
      headerText: "ID",
      visible: false,
    },
    {
      field: "folio",
      headerText: "Folio",
      width: "20%",
      minWidth: "150",
    },
    {
      field: "nombre",
      headerText: "Nombre",
      width: "20%",
      minWidth: "120",
    },
    {
      field: "fechaInstruccion",
      headerText: "Instrucción",
      width: "20%",
      minWidth: "120",
      format: "yMd",
      type: "date",
    },
    {
      field: "fechaPCierre",
      headerText: "P.Cierre",
      width: "20%",
      minWidth: "120",
      format: "yMd",
      type: "date",
    },
    {
      field: "prioridad",
      minWidth: "100",
      headerText: "Prioridad",
      width: "20%",
      template: prioTemplate as any,
    },
    {
      field: "estatus",
      headerText: "Estatus",
      width: "20%",
      minWidth: "140",
    },
  ];
  /////////////////////////////////////////////

  //////////////////////////////////////////
  const cambiarDatos = useCallback(
    (objeto = acuerdosImportantes) => {
      if (!objeto) return; // null object
      const objetoT = objeto;
      try {
        setData(
          objetoT.map((acuerdo: Acuerdo) => {
            //cambiar la fecha de instruccion de string a date
            acuerdo.fechaInstruccion = acuerdo.fechaInstruccion
              ? new Date(acuerdo.fechaInstruccion as any)
              : (null as any);

            acuerdo.fechaPCierre = acuerdo.fechaPCierre
              ? new Date(acuerdo.fechaPCierre as any)
              : (null as any);

            acuerdo.fechaIEjecucion = acuerdo.fechaIEjecucion
              ? new Date(acuerdo.fechaIEjecucion as any)
              : (null as any);

            acuerdo.fechaRCierre = acuerdo.fechaRCierre
              ? new Date(acuerdo.fechaRCierre as any)
              : (null as any);

            acuerdo.fechaCreacion = acuerdo.fechaCreacion
              ? new Date(acuerdo.fechaCreacion as any)
              : (null as any);

            //vencido: que se ha pasa la fecha programada de cierre
            //fuera de tiempo: que se ha pasado la fecha de instruccion y el estado no es en proceso

            if (
              acuerdo.estatus !== "Finalizado" &&
              acuerdo.estatus !== "Cancelado" &&
              !acuerdo.estatus.includes("Vencido")
            ) {
              if (acuerdo.fechaPCierre && acuerdo.fechaPCierre < hoy.current) {
                acuerdo.estatus =
                  acuerdo.estatus === "Registrado"
                    ? "Vencido (Registrado)"
                    : "Vencido (En proceso)";
                //acuerdo.estatus = `Vencido (${acuerdo.estatus})`;
              } else if (
                acuerdo.fechaInstruccion &&
                acuerdo.estatus === "Registrado" &&
                acuerdo.fechaInstruccion <= manana.current
              ) {
                acuerdo.estatus = "Para hoy";
                if (acuerdo.fechaInstruccion <= hoy.current) {
                  acuerdo.estatus = "Fuera de tiempo";
                }
              }

              if (
                acuerdo.fechaPCierre &&
                acuerdo.fechaPCierre.getTime() <= manana.current.getTime() &&
                acuerdo.fechaPCierre.getTime() >= hoysh.current.getTime() &&
                !acuerdo.estatus.includes("Vencido")
              ) {
                acuerdo.estatus = "Vence hoy";
              }
            }
            return acuerdo;
          })
        );
      } catch {}
      gridInstance?.refresh();
    },
    [acuerdosImportantes, gridInstance]
  );
  ////////////////////////////////
  const cambiarEstado = (estatus: String) => {
    const data =
      estatus === "Cancelado"
        ? { estatus: "Cancelado", fechaIEjecucion: "", fechaRCierre: "" }
        : { estatus };

    updateAcuerdo(data, activeAcuerdo?._id as string)
      .then((res: any) => {
        if (Object.entries(res).length !== 0) {
          const resp = res.acuerdoP
            ? {
                acuerdoP: res.acuerdoP,
                acuerdo: res.acuerdo,
              }
            : {
                acuerdoP: res.acuerdo,
                acuerdo: res.acuerdo,
              };
          dispatch(updateAcuerdoL(resp, activeAcuerdo?._id as string));
          dispatch(startRenew());

          switch (estatus) {
            case "Cancelado":
              Swal.fire({
                title: "Cancelado",
                text: "El acuerdo ha sido cancelado",
                icon: "success",
                timer: 2000,
              });
              break;
            case "Registrado":
              Swal.fire({
                title: "Registrado",
                text: "El acuerdo ha regresado al estado registrado",
                icon: "success",
                timer: 2000,
              });
              break;
            default:
              break;
          }
        }
      })
      .catch((err) => {});
  };

  //cierre del modal
  const handleOnClose = () => {
    setOpenModal(false);
    dispatch(clearActiveAcuerdo());
  };
  const handleOnCloseContactos = () => {
    setOpenModalContactos(false);
  }
  ///////////////////////////////////////////////////////////
  const onSelect = ({ data }: { data: any }) => {
    dispatch(setActiveAcuerdo(data));
    setOpenModal(true);
  };

  ///////////////////////////////////////////////////////////

  useEffect(() => {
    cambiarDatos();
  }, [acuerdosImportantes,cambiarDatos]);

  return (
    <>
       <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleOnClose}
      >
        <Box sx={style}>
          <div className="vAcuerdos">
            <Typography variant="h5" id="modal-modal-title">
              <div className="titulo">{activeAcuerdo?.folio}</div>
            </Typography>
            <Typography variant="subtitle1" id="modal-modal-description">
              {/*-------------Datos de la primera fila* */}
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-auto container row justify-content-start">
                    <div className="col-auto fuente-subtitulo">
                      Nombre del acuerdo:
                    </div>
                    <div className="col q-auto">{activeAcuerdo?.nombre}</div>
                  </div>
                  <div className="col-auto container row justify-content-start">
                    <div className="col-auto fuente-subtitulo">
                      Dueño del acuerdo:
                    </div>
                    <div className="col q-auto">
                      {activeAcuerdo?.responsable._id === uid
                        ? "Tú"
                        : activeAcuerdo?.responsable.name}
                    </div>
                  </div>
                  <div className={`col-auto container row justify-content-start`}>
                    <div className="col-auto fuente-subtitulo">
                      Estado del acuerdo:
                    </div>
                    <div
                      className={`col-auto ${
                        activeAcuerdo?.estatus.includes("Vencido")
                          ? "fuente-Vencido"
                          : activeAcuerdo?.estatus === "Cancelado"
                          ? "fuente-Cancelado"
                          : activeAcuerdo?.estatus === "Registrado"
                          ? "fuente-Registrado"
                          : activeAcuerdo?.estatus === "En proceso"
                          ? "fuente-En"
                          : activeAcuerdo?.estatus === "Finalizado"
                          ? "fuente-Finalizado"
                          : activeAcuerdo?.estatus === "Fuera de tiempo"
                          ? "fuente-Fuera"
                          : activeAcuerdo?.estatus.includes("hoy")
                          ? "fuente-Hoy"
                          : "fuente-subtitulo"
                      }`}
                    >
                      {activeAcuerdo?.estatus}
                    </div>
                  </div>
                </div>
                {/*-------------Datos de la segunda fila----------------------------* */}
                <div className="row container justify-content-between">
                  <div className="col-auto row">
                    <div className="col-auto fuente-subtitulo">
                      Descripción:
                    </div>
                    <div className="col-auto">{activeAcuerdo?.descripcion}</div>
                  </div>
                  <div className="col-auto row">
                    <div className="col-auto fuente-subtitulo">
                      Prioridad del acuerdo:
                    </div>
                    <div
                      className={`col-auto ${
                        activeAcuerdo?.prioridad === "Alta"
                          ? "fuente-Alta"
                          : activeAcuerdo?.prioridad === "Media"
                          ? "fuente-Media"
                          : activeAcuerdo?.prioridad === "Baja"
                          ? "fuente-Baja"
                          : "fuente-subtitulo"
                      }`}
                    >
                      {activeAcuerdo?.prioridad}
                    </div>
                  </div>
                </div>
                {/*---------------------------Datos tercera fila----------------------* */}
                <div
                  className={`row container ${
                    activeAcuerdo?.fechaInstruccion &&
                    activeAcuerdo?.fechaPCierre
                      ? "justify-content-between"
                      : "justify-content-start"
                  } `}
                >
                  {activeAcuerdo?.fechaInstruccion && (
                    <>
                      <div className="col-auto row justify-content-start">
                        <div className="col-auto fuente-subtitulo">
                          Fecha de instrucción:
                        </div>
                        <div className="col-auto">
                          {new Date(
                            activeAcuerdo?.fechaInstruccion.toString()
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </>
                  )}
                  {activeAcuerdo?.fechaPCierre && (
                    <>
                      <div className="col-auto row justify-content-start">
                        <div className="col-auto fuente-subtitulo">
                          Fecha programada de cierre:
                        </div>
                        <div className="col-auto">
                          {new Date(
                            activeAcuerdo?.fechaPCierre.toString()
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/*---------------------------Datos cuarta fila----------------------* */}
                <div
                  className={`row container ${
                    activeAcuerdo?.fechaIEjecucion &&
                    activeAcuerdo?.fechaRCierre
                      ? "justify-content-between"
                      : "justify-content-start"
                  } `}
                >
                  {activeAcuerdo?.fechaIEjecucion && (
                    <>
                      <div className="col-auto row justify-content-start">
                        <div className="col-auto fuente-subtitulo">
                          Fecha de inicio de ejecución:
                        </div>
                        <div className="col-auto">
                          {new Date(
                            activeAcuerdo?.fechaIEjecucion.toString()
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </>
                  )}
                  {activeAcuerdo?.fechaRCierre && (
                    <>
                      <div className="col-auto row justify-content-start">
                        <div className="col-auto fuente-subtitulo">
                          Fecha de cierre:
                        </div>
                        <div className="col-auto">
                          {new Date(
                            activeAcuerdo?.fechaRCierre.toString()
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/*---------------------------Datos quinta fila----------------------* */}
                <div className="row container justify-content-between">
                  <div className="col-auto row">
                    <div className="col-auto fuente-subtitulo">Area:</div>
                    <div className="col-auto">{activeAcuerdo?.area.nombre}</div>
                  </div>
                  <div className="col-auto row">
                    <div className="col-auto fuente-subtitulo">Categoria:</div>
                    <div className="col-auto">
                      {activeAcuerdo?.categoria.nombre}
                    </div>
                  </div>
                  <div className="col-auto row">
                    <div className="col-auto fuente-subtitulo">Ambito:</div>
                    <div className="col-auto">
                      {activeAcuerdo?.ambito.nombre}
                    </div>
                  </div>
                </div>
                {/*---------------------------Datos sexta fila----------------------* */}
                <div className="row container justify-content-start">
                  <div className="col-auto row">
                    <div className="col-auto fuente-subtitulo">Lugar:</div>
                    <div className="col-auto">{activeAcuerdo?.lugar}</div>
                  </div>
                </div>
                {/*---------------------------Datos septima fila----------------------* */}
                <div className="row container justify-content-between">
                  {activeAcuerdo?.intervensores &&
                    activeAcuerdo.intervensores.length > 0 && (
                      <div className="col-auto row">
                        <div className="col-auto fuente-subtitulo">
                          <a
                            id="aContacto"
                            onClick={() => setOpenModalContactos(true)}
                          >
                            <IoIosContacts className="mlogo" />
                            <p className="d-inline mt-4">
                              <u>Contactos</u>
                            </p>
                          </a>
                        </div>
                      </div>
                    )}
                  {activeAcuerdo?.responsable._id === uid && (
                    <AgregarPersonal />
                  )}
                 <PersonalAcuerdo />
                </div>
                {/*---------------------------Datos octava fila----------------------* */}
                {activeAcuerdo?.resultado && activeAcuerdo?.resultado !== "" && (
                  <div className="row container justify-content-start">
                    <div className="col-auto row">
                      <div className="col-auto fuente-subtitulo">
                        Resultado:
                      </div>
                      <div className="col-auto">{activeAcuerdo?.resultado}</div>
                    </div>
                  </div>
                )}
                {/*--------------------------- Datos novena fila-------------------------- */}
                <div className="row container justify-content-between mt-4">
                  <button
                    className=" col-auto btn btn-primary"
                    onClick={() => {
                      navigate("../editarAcuerdo", { replace: true });
                    }}
                  >
                    Editar Acuerdo
                  </button>
                  {(activeAcuerdo?.estatus.includes("En proceso") ||
                    activeAcuerdo?.estatus === "Finalizado" || activeAcuerdo?.fechaIEjecucion) && (
                    <CambiarFAcuerdo />
                  )}

                  {(activeAcuerdo?.estatus.includes("Registrado") ||
                    activeAcuerdo?.estatus === "Fuera de tiempo" ||
                    activeAcuerdo?.estatus === "Para hoy") && <EnProceso />}

                  {(activeAcuerdo?.estatus.includes("En proceso") ||
                    activeAcuerdo?.estatus === "Vence hoy") &&
                    activeAcuerdo?.fechaIEjecucion !== null && <Finalizado />}

                  {activeAcuerdo?.estatus !== "Cancelado" &&
                    activeAcuerdo?.estatus !== "Finalizado" &&
                    activeAcuerdo?.compromiso !== (null || undefined) &&
                    activeAcuerdo?.compromiso?.length === 0 && (
                      <button
                        className="col-auto btn btn-danger"
                        onClick={() => cambiarEstado("Cancelado")}
                      >
                        Cancelar Acuerdo
                      </button>
                    )}

                  {activeAcuerdo?.estatus === "Cancelado" &&
                    activeAcuerdo?.compromiso?.length === 0 && (
                      <button
                        className="col-auto btn btn-success"
                        onClick={() => cambiarEstado("Registrado")}
                      >
                        Cambiar a "Registrado"
                      </button>
                    )}
                  {activeAcuerdo?.estatus === "Finalizado" && (
                    <button
                      className="col-auto btn btn-agregar"
                      onClick={() => {
                        navigate("../agregarCompromiso", { replace: true });
                      }}
                    >
                      Agregar compromiso
                    </button>
                  )}
                </div>
              </div>
            </Typography>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openModalContactos}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleOnCloseContactos}
      >
        <Box sx={styleModalContactos}>
          <Typography
            variant="h4"
            id="modal-modal-title"
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <div className="titulo">Contactos del acuerdo</div>
            <hr />
          </Typography>
          <Typography variant="subtitle1" id="modal-modal-description">
            <div className="container">
              {
               activeAcuerdo?.intervensores &&  activeAcuerdo?.intervensores.map((intervensor) => (
                <ContactosAcuerdo contacto={intervensor} key={intervensor._id}/>
              ))
              }
            </div>
          </Typography>
        </Box>
      </Modal>

      <div className="card">
        <div className="card-header">
          <h4>Proximos/Urgentes</h4>
        </div>
      </div>
      <div className="control-pane">
        <div className="control-section">
          <GridComponent
            dataSource={data}
            height="100%"
            width="100%"
            allowPaging={true}
            pageSettings={{ pageSizes: true, pageSize: 5, pageCount: 8 }}
            rowSelected={onSelect}
            ref={(grid) => (gridInstance = grid)}
            columns = {columns}
            allowFiltering={true}
            allowSorting={true}
            filterSettings={filterOptions}

          >
            <Inject services={[Page]} />
          </GridComponent>
        </div>
      </div>
    </>
  );
};
