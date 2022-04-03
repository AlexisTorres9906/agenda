import { Browser } from "@syncfusion/ej2-base";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
import { Evento } from "../../data/Evento";

export const GridRecientes = () => {
  const evento = Evento;
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>Proximos/Urgentes</h4>
        </div>
      </div>
      {!Browser.isDevice ? (
        <div className="control-pane">
          <div className="control-section">
            <GridComponent
              dataSource={evento}
              height="100%"
              enableAdaptiveUI={true}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="id"
                  headerText="id"
                  textAlign="Right"
                  visible={false}
                />
                <ColumnDirective
                  field="nombre"
                  headerText="nombre"
                  width="30%"
                />
                <ColumnDirective
                  field="fecha"
                  headerText="fecha"
                  width="70%"
                  format="C2"
                />
              </ColumnsDirective>
            </GridComponent>
          </div>
        </div>
      ) : (
        <div className="e-mobile-layout celular">
          <div className="e-mobile-content">
            <GridComponent
              dataSource={evento}
              height="100%"
              enableAdaptiveUI={true}
              rowRenderingMode={"Vertical"}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="id"
                  headerText="id"
                  textAlign="Right"
                  visible={false}
                ></ColumnDirective>
                <ColumnDirective
                  field="nombre"
                  headerText="nombre"
                  width="50%"
                ></ColumnDirective>
                <ColumnDirective
                  field="fecha"
                  headerText="fecha"
                  width="50%"
                  format="C2"
                />
              </ColumnsDirective>
            </GridComponent>
          </div>
        </div>
      )}
    </>
  );
};
