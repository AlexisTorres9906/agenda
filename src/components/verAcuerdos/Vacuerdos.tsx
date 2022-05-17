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
import { useEffect, useState } from "react";
import * as gregorian from "../../data/es-MX/ca-gregorian.json";
import * as numbers from "../../data/es-MX/numbers.json";
import * as timeZoneNames from "../../data/es-MX/timeZoneNames.json";
//import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styleModalInfo } from "../../helpers/stylesModal";
import { clearActiveAcuerdo, setActiveAcuerdo } from "../../actions/acuerdo";

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

  //////////////////////////////////////////
  //mapeo de string a date de los datos y cambio de vencidos
  const cambiarDatos = (objeto = acuerdos) => {
    if (!objeto) return; // null object
    objeto.forEach((acuerdo) => {
      //cambiar la fecha de instruccion de string a date
      acuerdo.fechaInstruccion = acuerdo.fechaInstruccion
        ? new Date(acuerdo.fechaInstruccion as any)
        : (null as any);
      //ver quienes estan vencidos
      acuerdo.estatus = acuerdo.fechaInstruccion
        ? acuerdo.fechaInstruccion < new Date()
          ? "Vencido"
          : acuerdo.estatus
        : acuerdo.estatus;
      //seguir leyendo en caso de que haya mas acuerdos
      if (
        acuerdo.compromiso != (undefined || null) &&
        acuerdo.compromiso?.length > 0
      ) {
        cambiarDatos(acuerdo.compromiso);
      }
    });
  };
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
              <p className="titulo">{activeAcuerdo?.folio}</p>
            </Typography>
            <Typography variant="subtitle1" id="modal-modal-description">
              <div className="container">
                <div className="row justify-content-between">
                  <p className="col-auto container ">
                    <div className="col-auto fuente-subtitulo">
                      Nombre del acuerdo:
                    </div>
                    <div className="col-auto">{activeAcuerdo?.nombre}</div>
                  </p>
                  <p className={`col-md-6 container `}>
                    <div className="row justify-content-end">
                      <div className="col-auto fuente-subtitulo">
                        Estado del acuerdo:
                      </div>
                      <div
                        className={`col-auto fuente-${activeAcuerdo?.estatus}`}
                      >
                        {activeAcuerdo?.estatus}
                      </div>
                    </div>
                  </p>
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
            width="300"
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
