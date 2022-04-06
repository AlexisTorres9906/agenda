import { DataGrid, esES } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../interface/User";
import { startGetUsers, startGetAreas } from '../../actions/admin';
import { RootState } from "../../store/store";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { startLoading, stopLoading } from '../../actions/ui';

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "name", headerName: " Nombre", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "nombreArea", headerName: "Area", width: 150 },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  height: 'auto',
  boxShadow: 24,
  p: 4,
};


export const UsuariosAdm = () => {
  const [users, setUsers] = useState([] as User[]);
  const [openModal, setOpenModal] = useState(false)
  const { Users,Areas } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    dispatch(startGetUsers());
    dispatch(startGetAreas());
    dispatch(stopLoading());
    }, [dispatch]);

  useEffect(() => {
    const user = Users.map((user: User) => {
      const nombreArea = user.area.nombre;
      const id = user.uid;
      return {
        ...user,
        nombreArea,
        id,
      };
    });
    setUsers(user);
  }, [Users]);

  const handleClick = (params: any) => {
    setOpenModal(true);
  };


  return (
    <div className="UserTable">
      <DataGrid
      initialState={{
        pagination: {
          pageSize: 10,
        },
      }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        columns={columns}
        rows={users as []}
        onRowClick={(p) => handleClick(p)}
        autoHeight={true}
        rowsPerPageOptions={[100,50,25,10]}
      />

      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => setOpenModal(false)}
      >
        <Box sx={style}>
          <form>
            <Typography variant="h6" id="modal-modal-title">
              Usuario
            </Typography>


            <div className="mb-3">
                <label className="form-label">
                  
                <i className="fas fa-user"></i> Nombre
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  placeholder="Escribe el nombre de la persona"
                />
              </div>


              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-user-cog"></i> UserName
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="userName"
                  placeholder="Escribe el UserName "
                />
              </div>


              <div className="mb-3">
                <label className="form-label">
                  <i className="far fa-file-alt"></i> Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-exclamation"></i> Area
                </label>
                <select className="form-select" defaultValue={"0"}>
                    <option value="0">Escoge un area</option>
                    {Areas.map((area: any) => (
                      <option key={area.id} value={area.id}>
                        {area.nombre}
                      </option>
                    ))}
                </select>
              </div>



          </form>
        </Box>
      </Modal>
    </div>
  );
};
