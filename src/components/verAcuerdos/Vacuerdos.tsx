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
} from "@syncfusion/ej2-react-treegrid";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import * as EJ2_LOCALE from "../../data/es.json";
import "../../styles/vAcuerdos.scss";
import { L10n, loadCldr, setCulture } from "@syncfusion/ej2-base";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState, useCallback } from "react";
import * as gregorian from "../../data/es-MX/ca-gregorian.json";
import * as numbers from "../../data/es-MX/numbers.json";
import * as timeZoneNames from "../../data/es-MX/timeZoneNames.json";
//import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styleModalInfo } from "../../helpers/stylesModal";
import { clearActiveAcuerdo, setActiveAcuerdo } from "../../actions/acuerdo";
import { Acuerdo } from "../../interface/Acuerdos";
import { useNavigate } from "react-router-dom";

loadCldr(gregorian, numbers, timeZoneNames);
setCulture("es-MX");
const data = EJ2_LOCALE;

L10n.load(data);

//////////////////////////////////////////
///tree grid
const toolbarOptions: any = ["Search", "ExcelExport", "PdfExport", "CsvExport"];
const editSettings: any = { mode: "Dialog" };
const filterOptions: any = { type: "Excel" };
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
      ? "https://i.ibb.co/zhLrsvV/media.png"
      : "https://i.ibb.co/zskVDGf/alta.png";
  return (
    <div>
      <img style={loc} src={prioridad} alt="" />
      <span id="prioridad">{props.prioridad}</span>
    </div>
  );
};
const style = styleModalInfo;
export const Vacuerdos = () => {
  //////////////////////////////////////////
  //información de los acuerdos y generales iniciales
  const { acuerdos, activeAcuerdo } = useSelector(
    (state: RootState) => state.acuerdos
  );
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ///en caso de regresar de otra pantalla
  useEffect(() => {
    const func = () => {
      if (!activeAcuerdo) {
        setOpenModal(false);
      }
      else {
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

        //ver quienes estan vencidos
        acuerdo.estatus =
          acuerdo.estatus === "Registrado" || "En proceso"
            ? acuerdo.fechaPCierre
              ? acuerdo.fechaPCierre < new Date()
                ? "Vencido"
                : acuerdo.estatus
              : acuerdo.estatus
            : acuerdo.estatus;
        //seguir leyendo en caso de que haya mas acuerdos
        if (
          acuerdo.compromiso != (undefined || null) &&
          acuerdo!.compromiso.length > 0
        ) {
          cambiarDatos(acuerdo.compromiso);
        }
      });
    },
    [acuerdos]
  );

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
                  <div className={`col-auto container row justify-content-end`}>
                    <div className="col-auto fuente-subtitulo">
                      Estado del acuerdo:
                    </div>
                    <div
                      className={`col-auto fuente-${activeAcuerdo?.estatus}`}
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
                      className={`col-auto fuente-${activeAcuerdo?.prioridad}`}
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
                <div className="row container justify-content-between mt-3">
                  <button
                    className=" col-auto btn btn-primary"
                    onClick={() => {
                      //navigate
                      navigate("../editarAcuerdo", { replace: true });
                    }}
                  >
                    Editar
                  </button>
                  <button className=" col-auto btn btn-primary">Cambiar</button>
                </div>
              </div>
            </Typography>
          </div>
        </Box>
      </Modal>
      <TreeGridComponent
        ref={(treegrid) => (treegridInstance = treegrid)}
        dataSource={data}
        treeColumnIndex={1}
        childMapping="compromiso"
        height="550"
        width="100%"
        allowFiltering={true}
        allowSorting={true}
        pageSettings={{ pageSize: 50 }}
        enableInfiniteScrolling={true}
        filterSettings={filterOptions}
        toolbar={toolbarOptions}
        editSettings={editSettings}
        allowExcelExport={true}
        allowPdfExport={true}
        toolbarClick={toolbarClick.bind(this)}
        locale="es-MX"
        rowSelected={onSelect}
        //enableAdaptiveUI={true}
      >
        <ColumnsDirective>
          <ColumnDirective field="_id" visible={false} />
          <ColumnDirective field="folio" headerText="Folio" width="190" />
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
};
