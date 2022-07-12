import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Inject,
  Page,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startAceptarSolicitud, startRechazarSolicitud } from "../../actions/solicitud";
import { RootState } from "../../store/store";

export const VerSolicitudes = () => {
  const toolbarOptions = ["Search"];
  const filterOptions: any = { type: "Excel" };
  const solicitudes = useSelector((state: RootState) => state.solicitudes);
  const dispatch = useDispatch();
  //template para los botones de la tabla
  const botones = (data:any) =>{
    const aceptar = (data:any) =>{
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta solicitud sera aceptada",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, aceptar",
        cancelButtonText: "No, cancelar",
      }).then((result:any) => {
        if (result.value) {
          dispatch(startAceptarSolicitud(data._id));
        }
      });
    }
    const rechazar = (data:any) =>{
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta solicitud sera rechazada",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, rechazar",
        cancelButtonText: "No, cancelar",
      }).then((result:any) => {
        if (result.value) {
          dispatch(startRechazarSolicitud(data._id));
        }
      });
    }
    return (
      <div className="mx-auto">
        <button className="btn btn-success" onClick={()=>aceptar(data)}>
          <i className="fa fa-check"></i>
        </button>ㅤㅤ
        <button className="btn btn-danger" onClick={()=>rechazar(data)}>
          <i className="fa fa-trash"></i>
        </button>
        </div>
    );
  }

  return (
    <GridComponent
      dataSource={solicitudes}
      toolbar={toolbarOptions}
      allowPaging={true}
      pageSettings={{ pageSizes: true, pageSize: 10, pageCount: 4 }}
      allowExcelExport={true}
      allowPdfExport={true}
      height="69vh"
      width="100%"
      allowFiltering={true}
      allowSorting={true}
      filterSettings={filterOptions}
      immediateRender={false}
    >
      <ColumnsDirective>
        <ColumnDirective
          headerText=""
          width="50"
          field="_id"
          visible={false}
          textAlign="Center"
          allowSorting={false}
          allowFiltering={false}
        />
        <ColumnDirective
          headerText="Folio"
          width="90"
          minWidth='150px'
          field="acuerdo.folio"
          textAlign="Center"
          allowFiltering={false}
        />
        <ColumnDirective
          field="acuerdo.nombre"
          headerText="Nombre"
          width="180"
        />
        <ColumnDirective
          field="invitador.name"
          headerText="Invitador"
          width="220"
        />

        <ColumnDirective
          headerText=""
          width="100"
          minWidth='190px'
          allowFiltering={false}
          allowSorting={false}
          template={botones}
        />

      </ColumnsDirective>
      <Inject services={[Toolbar, Filter, Sort, Page]} />
    </GridComponent>
  );
};
