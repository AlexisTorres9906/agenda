import { DataGrid, esES } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../interface/User";
import {
  startGetUsers,
  startGetAreas,
  startAddUser,
  setActiveUser,
  cleanActiveUser,
  changeUserResOk,
} from "../../actions/admin";
import { RootState } from "../../store/store";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { startLoading, stopLoading } from "../../actions/ui";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
} from "formik";
import * as Yup from "yup";
import { styleModal } from "../../helpers/stylesModal";

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "name", headerName: " Nombre", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "nombreArea", headerName: "Area", width: 150 },
];

const style = styleModal;

export const UsuariosAdm = () => {
  const [users, setUsers] = useState([] as User[]);
  const [openModal, setOpenModal] = useState(false);
  const { Users, Areas, ResponseOk, ActiveUser } = useSelector(
    (state: RootState) => state.admin.UserTab
  );
  const dispatch = useDispatch();
  let initialValues = ActiveUser
    ? {
        name: ActiveUser.name,
        userName: ActiveUser.username,
        area: ActiveUser.area._id,
      }
    : {
        name: "",
        userName: "",
        password: "",
        area: Areas[0] ? Areas[0]._id : "",
      };

  const FormikProps: FormikConfig<FormikValues> = {
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es requerido"),
      userName: Yup.string().required("El username es requerido"),
      //password more than 6 characters and at least one number
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es requerida"),
      //area: Yup.string().required("El area es requerida"),
    }),
    onSubmit: (values) => {
      dispatch(startAddUser(values as User));
    },
  };


  useEffect(() => {
    if(ResponseOk){
      setOpenModal(false);
      dispatch(changeUserResOk(false));
    }
  }, [ResponseOk]);
  

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
    delete params.row.id;
    dispatch(setActiveUser(params.row));
  };
  const handleAdd = () => {
    setOpenModal(true);
  };
  const handleOnClose = () => {
    setOpenModal(false);
    dispatch(cleanActiveUser());
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
        rowsPerPageOptions={[100, 50, 25, 10]}
      />

      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleOnClose}
      >
        <Box sx={style}>
          <Formik {...FormikProps}>
            {(form) => (
              <Form>
                <Typography variant="h6" id="modal-modal-title">
                  Usuario
                </Typography>

                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-user"></i> Nombre
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    style={
                      form.touched.name &&
                      form.errors.name && { border: "1px solid red" }
                    }
                    name="name"
                    placeholder="Escribe el nombre de la persona"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="name" component="div" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <i className="fas fa-user-cog"></i> UserName
                  </label>
                  <Field
                    className="form-control"
                    type="text"
                    name="userName"
                    style={
                      form.touched.userName &&
                      form.errors.userName && { border: "1px solid red" }
                    }
                    placeholder="Escribe el UserName "
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="userName" component="div" />
                  </div>
                </div>
                {!ActiveUser && (
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-lock"></i> Password
                    </label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      style={
                        form.touched.password &&
                        form.errors.password && { border: "1px solid red" }
                      }
                      autoComplete="off"
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="password" component="div" />
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    <i className="far fa-address-card"></i> Area
                  </label>
                  <Field
                    as="select"
                    name="areas"
                    className="form-select"
                    style={
                      form.touched.area &&
                      form.errors.area && { border: "1px solid red" }
                    }
                  >
                    {Areas.map((area: any) => (
                      <option key={area._id} value={area._id}>
                        {area.nombre}
                      </option>
                    ))}
                  </Field>
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="area" component="div" />
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-center mb-3">
                  <button className="btn btn-primary" type="submit">
                    {ActiveUser ?  "Editar Usuario":"Crear Usuario"  }
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <button onClick={handleAdd} className="btn-flotante">
        <span>
          <i className="fas fa-plus"></i>
        </span>
      </button>
    </div>
  );
};
