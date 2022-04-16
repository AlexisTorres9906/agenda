import { DataGrid, esES } from "@mui/x-data-grid";
import { styleModal } from "../../helpers/stylesModal";
import { Categorias } from '../../interface/Admin';

const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "nombre", headerName: " Nombre Categoria", width: 150 },
];
const style = styleModal;

const Categoria: Categorias[] = [
  {
    _id: "1",
    nombre: "Categoria 1",
  },
  {
    _id: "2",
    nombre: "Categoria 2",
  },
];

export const CategoriasAdm = () => {
  ////////////////////////////////////////////////////////

  //click sobre una fila
  const handleClick = (params: any) => {
    console.log(params);
  };

  return (
    <>
      <div>
        <h1>Listado de Categorias</h1>
      </div>
      <div className="TableInf">
        <DataGrid
          initialState={{
            pagination: {
              pageSize: 10,
            },
          }}
          getRowId={(row:any) => row._id}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          rows={Categoria as []}
          onRowClick={(p) => handleClick(p)}
          rowsPerPageOptions={[100, 50, 25, 10]}
        />
      </div>
    </>
  );
};
