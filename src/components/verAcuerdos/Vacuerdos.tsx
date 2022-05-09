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
import * as numberingSystems from "../../data/numberingSystems.json";
import * as gregorian from "../../data/ca-gregorian.json";
import * as numbers from "../../data/numbers.json";
import * as timeZoneNames from "../../data/timeZoneNames.json";
import { L10n, loadCldr } from "@syncfusion/ej2-base";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
loadCldr(numberingSystems, gregorian, numbers, timeZoneNames);
const data = EJ2_LOCALE;

L10n.load(data);

//////////////////////////////////////////
///tree grid
const toolbarOptions: any = [
  "Search",
  "ExcelExport",
  "PdfExport",
  "CsvExport",
  "Print",
];
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
  }
};

export const Vacuerdos = () => {
  //////////////////////////////////////////
  //información de los acuerdos
  const { acuerdos } = useSelector((state: RootState) => state.acuerdos);
  const [data, setData] = useState({});

  useEffect(() => {
    setData(
      acuerdos.map((acuerdo) => {
        return {
          ...acuerdo,
          fechaCreacion: new Date(
            DateTime.fromISO(
              acuerdo.fechaCreacion as unknown as string
            ).toLocaleString()
          ),
        };
      })
    );
  }, [acuerdos,data]);

  //////////////////////////////////////////

  return (
    <div className="e-mobile-layout">
      <div className="e-mobile-content">
        <TreeGridComponent
          ref={(treegrid) => (treegridInstance = treegrid)}
          dataSource={data}
          treeColumnIndex={1}
          childMapping="compromiso"
          height="550"
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
          locale="es"
          //enableAdaptiveUI={true}
        >
          <ColumnsDirective>
            <ColumnDirective field="_id" visible={false} />
            <ColumnDirective field="folio" headerText="Folio" width="30" />
            <ColumnDirective field="nombre" headerText="Nombre" width="30" />
            <ColumnDirective field="estatus" headerText="Estatus" width="30" />
            <ColumnDirective
              field="prioridad"
              headerText="Prioridad"
              width="30"
            />

              <ColumnDirective
              field="categoria.nombre"
              headerText="Categoria"
              width="30"
              format="yMd"
            />
             <ColumnDirective
              field="ambito.nombre"
              headerText="Ambito"
              width="30"
              format="yMd"
            />
             <ColumnDirective
              field="fechaInstruccion"
              headerText="Instruccion"
              width="30"
              format="yMd"
            />
            <ColumnDirective
              field="fechaCreacion"
              headerText="Creación"
              width="30"
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
      </div>
    </div>
  );
};
