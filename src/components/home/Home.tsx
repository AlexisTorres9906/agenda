import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
import "../../styles/home.scss";
import { Head } from "./Head";
import { Evento } from '../../data/Evento';
export const Home = () => {
  const evento = Evento
  return (
    <div className="home">
      <div className="head">
        <Head />
      </div>
      <div className="container ">
        <div className="row inform">
          <div className="col">
            <div className="control-pane">
              <div className="control-section">
                <GridComponent dataSource={evento} height="350">
                  <ColumnsDirective>
                    <ColumnDirective
                      field="id"
                      headerText="id"
                      width="120"
                      textAlign="Right"
                    ></ColumnDirective>
                    <ColumnDirective
                      field="nombre"
                      headerText="nombre"
                      width="150"
                    ></ColumnDirective>
                    <ColumnDirective
                      field="descripcion"
                      headerText="descripcion"
                      width="130"
                      format="yMd"
                      textAlign="Right"
                    />
                    <ColumnDirective
                      field="fecha"
                      headerText="fecha"
                      width="120"
                      format="C2"
                      textAlign="Right"
                    />
                  </ColumnsDirective>
                </GridComponent>
              </div>
            </div>
          </div>
          <div className="col-4">2 of 2</div>
        </div>
      </div>

      <a href="/agenda/home" className="btn-flotante">
        <span>
          <i className="fas fa-plus"></i>
        </span>
      </a>
    </div>
  );
};
