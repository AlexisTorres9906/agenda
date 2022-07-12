/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  InfiniteScroll,
  Inject,
  Page,
  Sort,
  Toolbar,
  TreeGridComponent,
  PdfExport,
  ExcelExport,
  SortSettingsModel,
} from "@syncfusion/ej2-react-treegrid";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import * as EJ2_LOCALE from "../../data/es.json";
import "../../styles/vAcuerdos.scss";
import { L10n, loadCldr, setCulture } from "@syncfusion/ej2-base";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import * as gregorian from "../../data/es-MX/ca-gregorian.json";
import * as numbers from "../../data/es-MX/numbers.json";
import * as timeZoneNames from "../../data/es-MX/timeZoneNames.json";
//import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoIosContacts} from "react-icons/io";
import {
  styleModalContactoVacuerdo,
  styleModalInfo,
} from "../../helpers/stylesModal";
import {
  clearActiveAcuerdo,
  setActiveAcuerdo,
  updateAcuerdoL,
} from "../../actions/acuerdo";
import { Acuerdo } from "../../interface/Acuerdos";
import { useNavigate } from "react-router-dom";
import { updateAcuerdo } from "../../Api/sendAcuerdo";
import Swal from "sweetalert2";
import { EnProceso } from "./EnProceso";
import React from "react";
import { Finalizado } from "./Finalizado";
import { CambiarFAcuerdo } from "./CambiarFAcuerdo";
import { startRenew } from "../../actions/auth";
import { ContactosAcuerdo } from "./ContactosAcuerdo";
import { AgregarPersonal } from "./AgregarPersonal";
import { PersonalAcuerdo } from "./PersonalAcuerdo";

//GridRecientes

/*const { acuerdosImportantes } = useSelector((state: RootState) => state.acuerdos);
  const evento = Evento;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetAcuerdosImportantes());
  }, [])* */

loadCldr(gregorian, numbers, timeZoneNames);
setCulture("es-MX");
const data = EJ2_LOCALE;

L10n.load(data);

//////////////////////////////////////////
///tree grid
const toolbarOptions: any = ["Search", "ExcelExport", "PdfExport", "CsvExport"];
const editSettings: any = { mode: "Dialog" };

let treegridInstance: TreeGridComponent | null;
const collapsedStatePersist: boolean = true;

const toolbarClick = (args: ClickEventArgs): void => {
  switch (args.item.id) {
    case treegridInstance?.grid.element.id + "_pdfexport":
      let pdfExportProperties = {
        isCollapsedStatePersist: collapsedStatePersist,
      };
      treegridInstance?.pdfExport(pdfExportProperties);
      break;
    case treegridInstance?.grid.element.id + "_excelexport":
      let excelExportProperties = {
        isCollapsedStatePersist: collapsedStatePersist,
      };
      treegridInstance?.excelExport(excelExportProperties);
      break;
    case treegridInstance?.grid.element.id + "_csvexport":
      treegridInstance?.csvExport();
      break;
    case treegridInstance?.grid.element.id + "_print":
      treegridInstance?.print();
      break;
  }
};

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
const style = styleModalInfo;
const styleModalContactos = styleModalContactoVacuerdo;
interface Props {
  columns:Object[];
}
export const Vacuerdos = React.memo((Props:Props) => {
  //////////////////////////////////////////
  //información de los acuerdos y generales iniciales
  const { acuerdos, activeAcuerdo } = useSelector(
    (state: RootState) => state.acuerdos
  );
  const { uid } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalContactos, setOpenModalContactos] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hoy = useRef(new Date());
  const hoysh = useRef(new Date());
  const filterOptions: any = { type: "Excel", columns : Props.columns};
  //manana
  const manana = useRef(new Date());
  useMemo(() => {
    manana.current.setHours(23, 59, 59, 0);
    hoysh.current.setHours(0, 0, 0, 0);
  }, []);
  //hoy


  
  const sortOptions: SortSettingsModel = {
    columns: [{ field: "fechaCreacion", direction: "Descending" }],
  };

  ///en caso de regresar de otra pantalla
  useEffect(() => {
    const func = () => {
      if (!activeAcuerdo) {
        setOpenModal(false);
      } else {
        setOpenModal(true);
      }
    };
    func();
  }, [activeAcuerdo]);

  //////////////////////////////////////////
  const cambiarDatos = useCallback(
    (objeto = acuerdos) => {
      if (!objeto) return; // null object
      objeto.forEach((acuerdo: Acuerdo) => {
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
            acuerdo.estatus = `Vence hoy`;
          }
        }
        //seguir leyendo en caso de que haya mas sub acuerdos(compromisos)
        if (acuerdo.compromiso && acuerdo.compromiso.length > 0) {
          cambiarDatos(acuerdo.compromiso);
        }
      });
    },
    [acuerdos]
  );

  ///funcion para saber si es hoy a cualquier hora

  //mapeo de string a date de los datos y cambio de vencidos

  useEffect(() => {
    cambiarDatos();
    setData(acuerdos);
  }, [acuerdos, cambiarDatos]);

  //////////////////////////////////////////
  //click a un acuerdo
  const onSelect = ({ data }: { data: any }) => {
    dispatch(setActiveAcuerdo(data.taskData));
    setOpenModal(true);
  };
  //cierre del modal
  const handleOnClose = () => {
    setOpenModal(false);
    dispatch(clearActiveAcuerdo());
  };
  const handleOnCloseContactos = () => {
    setOpenModalContactos(false);
  };

  ////////////////////////////////////////////
  //botones---------------------------------- cambiar estado
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
  const rowDataBound = (args: any) => {
    if (args.data.level !== 0) {
      const level = 1 - args.data.level*.20
      args.row.style.backgroundColor = `rgba(155, 155, 155, ${level})`; // highlight the child rows
    }
  };

  ////////////////////////////////////////////
  const queryCellInfo = (args: any) => {
    if (args.column.field === "folio") {
      if (args.data.level !== 0) {
        args.cell.classList.add("child"); // add class to differentiate childrows
      }
    }
  };

  ////////////////////////////////////////////
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
                  <div
                    className={`col-auto container row justify-content-start`}
                  >
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
                    activeAcuerdo?.estatus === "Finalizado" ||
                    activeAcuerdo?.estatus === "Vence hoy") && (
                    <CambiarFAcuerdo />
                  )}

                  {(activeAcuerdo?.estatus.includes("Registrado") ||
                    activeAcuerdo?.estatus === "Fuera de tiempo" ||
                    activeAcuerdo?.estatus === "Para hoy" ||
                    !activeAcuerdo?.fechaIEjecucion) && <EnProceso />}

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
              {activeAcuerdo?.intervensores &&
                activeAcuerdo?.intervensores.map((intervensor) => (
                  <ContactosAcuerdo
                    contacto={intervensor}
                    key={intervensor._id}
                  />
                ))}
            </div>
          </Typography>
        </Box>
      </Modal>

      <TreeGridComponent
        ref={(treegrid) => (treegridInstance = treegrid)}
        dataSource={data}
        treeColumnIndex={1}
        childMapping="compromiso"
        height="72vh"
        width="100%"
        allowFiltering={true}
        allowSorting={true}
        pageSettings={{
          pageSizes: true,
          pageSize: 12,
          pageCount: 8,
          pageSizeMode: "Root",
        }}
        allowPaging={true}
        // enableInfiniteScrolling={true}
        filterSettings={filterOptions}
        toolbar={toolbarOptions}
        editSettings={editSettings}
        allowExcelExport={true}
        allowPdfExport={true}
        toolbarClick={toolbarClick.bind(this)}
        locale="es-MX"
        immediateRender={false}
        rowSelected={onSelect}
        sortSettings={sortOptions}
        enableCollapseAll={true}
        //enableAdaptiveUI={true}
        queryCellInfo={queryCellInfo}
        rowDataBound={rowDataBound}
      >
        <ColumnsDirective>
          <ColumnDirective field="_id" visible={false} />
          <ColumnDirective
            field="folio"
            headerText="Folio"
            width="220"
            minWidth="200px"
          />
          <ColumnDirective field="nombre" headerText="Nombre" width="120" />
          <ColumnDirective field="estatus" headerText="Estatus" width="120" />
          <ColumnDirective
            field="prioridad"
            headerText="Prioridad"
            width="120"
            template={prioTemplate}
          />

          <ColumnDirective
            field="categoria.nombre"
            headerText="Categoria"
            width="120"
          />
          <ColumnDirective
            field="ambito.nombre"
            headerText="Ambito"
            width="120"
          />
          <ColumnDirective
            field="fechaInstruccion"
            headerText="Instruccion"
            width="100"
            format="yMd"
            type="date"
          />

          <ColumnDirective
            field="fechaPCierre"
            headerText="P.Cierre"
            width="100"
            format="yMd"
            type="date"
          />
          <ColumnDirective
            field="fechaCreacion"
            headerText="Creación"
            type="date"
            width="120"
            format="yMd"
            visible={false}
          />
        </ColumnsDirective>
        <Inject
          services={[
            Filter,
            Sort,
            Toolbar,
            Page,
            InfiniteScroll,
            ExcelExport,
            PdfExport,
          ]}
        />
      </TreeGridComponent>
    </>
  );
});
