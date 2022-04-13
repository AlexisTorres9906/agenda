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
import React from "react";
import { startUpdateUser } from '../../actions/admin';
import {  startRenew } from '../../actions/auth';

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

  const validationSchema = ActiveUser ? Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    userName: Yup.string().required("El username es requerido"),
    area: Yup.string().required("El area es requerido"),
  }) : Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    userName: Yup.string().required("El username es requerido"),
    //password more than 6 characters and at least one number and no active user
    password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    area: Yup.string().required("El area es requerido"),
  });


  const FormikProps: FormikConfig<FormikValues> =  {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!ActiveUser) {
        //en caso de crear
        dispatch(startAddUser(values as User));
        dispatch(startRenew());
      }
      else{
        //en caso de editar
        dispatch(startUpdateUser({
          uid: ActiveUser.uid,
          area: values.area,
          userName: values.userName,
          name: values.name,
        }))
        dispatch(startRenew());
      }
    },
  };

  //ver si las consultas son correctas
  useEffect(() => {
    if (ResponseOk) {
      //si se creo una consulta y fue correcta cierra el modal y regresa a estado inicial
      setOpenModal(false);
      dispatch(cleanActiveUser());
      dispatch(changeUserResOk(false));
    }
  }, [ResponseOk,dispatch]);

    //hacer loading de cosas necesarias de la pagina
  useEffect(() => {
    dispatch(startLoading());
    dispatch(startGetUsers());
    dispatch(startGetAreas());
    dispatch(stopLoading());
  }, [dispatch]);


  //ve los usuarios y mapeo para usarlos en el data grid
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
    let id = params.row.id;
    delete params.row.id;
    dispatch(setActiveUser(params.row));
    params.row.id = id;
  };
  const handleAdd = () => {
    setOpenModal(true);
  };
  const handleOnClose = () => {
    setOpenModal(false);
    dispatch(cleanActiveUser());
  };

  //modal child para cambiar contraseña
  const ChildModal=()=> {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <div hidden={ActiveUser ? false : true}>
          <button className="btn btn-warning botonM" onClick={handleOpen}>
            <i className="fas fa-lock-open"></i>
          </button>
        </div>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={style}>
            <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </Box>
        </Modal>
      </>
    );
  }

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
                <Typography variant="h5" id="modal-modal-title">
                  {ActiveUser ? "Editar Usuario" : "Agregar Usuario"}
                </Typography>

                <div className="mb-3 mt-3">
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

                <div className="d-flex justify-content-around mb-3">
                  <ChildModal/>
                  <button className="btn btn-primary" type="submit">
                    {ActiveUser ? "Editar Usuario" : "Crear Usuario"}
                  </button>
                  <div hidden={ActiveUser ? false : true}>
                    <button className="btn btn-danger">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
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
