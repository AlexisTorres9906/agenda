/* eslint-disable jsx-a11y/anchor-is-valid */
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
  startDeleteUser,
  changeResponseOK,
} from "../../actions/admin";
import { RootState } from "../../store/store";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
} from "formik";
import * as Yup from "yup";
import { styleModal, styleModalChildren } from "../../helpers/stylesModal";
import { startUpdateUser } from "../../actions/admin";
import { startRenew } from "../../actions/auth";
import { updatePassword } from "../../Api/updatePassword";
import { ErrorSwall, toastMixin, QuestionSwall } from "../../helpers/swalls";
import { LoadingInfo } from "../LoadingInfo";

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "name", headerName: " Nombre", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "nombreArea", headerName: "Area", width: 150 },
];

const style = styleModal;
const styleChildren = styleModalChildren;

export const UsuariosAdm = () => {
  //valores y llamadas de inicio de la aplicacion
  const [users, setUsers] = useState([] as User[]);
  const [openModal, setOpenModal] = useState(false);
  const [openChildren, setOpenChildren] = useState(false);
  const [loadinInfo, setLoadingInfo] = useState(false);
  const { Users, Areas, ResponseOk, ActiveUser } = useSelector(
    (state: RootState) => state.admin.admInformation
  );
  const dispatch = useDispatch();
  //hacer loading de cosas necesarias de la pagina
  //memorize el dispatch para no tener que hacerlo cada vez
  useEffect(() => {
    const load = async () => {
      setLoadingInfo(true);
      await Promise.all([dispatch(startGetUsers()), dispatch(startGetAreas())]);
      setLoadingInfo(false);
    };
    load();
  }, [dispatch]);

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

  const validationSchema = ActiveUser
    ? Yup.object({
        name: Yup.string().required("El nombre es requerido"),
        userName: Yup.string().required("El username es requerido"),
        area: Yup.string().required("El area es requerido"),
      })
    : Yup.object({
        name: Yup.string().required("El nombre es requerido"),
        userName: Yup.string().required("El username es requerido"),
        //password is required and more than 6 characters
        password: Yup.string()
          .required("El password es requerido")
          .min(6, "Minimo 6 caracteres"),
        area: Yup.string().required("El area es requerido"),
      });

  const FormikProps: FormikConfig<FormikValues> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!ActiveUser) {
        //en caso de crear
        dispatch(startAddUser(values as User));
        dispatch(startRenew());
      } else {
        //en caso de actualizar
        dispatch(
          startUpdateUser({
            uid: ActiveUser.uid,
            area: values.area,
            userName: values.userName,
            name: values.name,
          })
        );
        dispatch(startRenew());
      }
    },
  };

  //formikprops children
  const FormikPropsChildren: FormikConfig<FormikValues> = {
    initialValues: {
      passwordC: "",
    },
    validationSchema: Yup.object({
      passwordC: Yup.string()
        .required("El password es requerido")
        .min(6, "Minimo 6 caracteres"),
    }),
    onSubmit: async (values) => {
      let error = false;
      try {
        await updatePassword({
          uid: ActiveUser.uid,
          password: values.passwordC,
        });
      } catch (err) {
        error = true;
      }
      dispatch(startRenew());
      if (error) {
        ErrorSwall.fire({
          timer: 2000,
        });
      } else {
        toastMixin.fire({
          text: "Contraseña actualizada",
        });
        setOpenChildren(false);
      }
    },
  };

  //ver si las consultas son correctas
  useEffect(() => {
    if (ResponseOk) {
      //si se creo una consulta y fue correcta cierra el modal y regresa a estado inicial
      setOpenModal(false);
      dispatch(cleanActiveUser());
      dispatch(changeResponseOK(false));
    }
  }, [ResponseOk, dispatch]);

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

  //click en alguna fila abrir modal y cambiar usuario activo
  const handleClick = (params: any) => {
    setOpenModal(true);
    dispatch(startRenew());
    let id = params.row.id;
    delete params.row.id;
    dispatch(setActiveUser(params.row));
    params.row.id = id;
  };
  //abrir modal al presionar boton de mas
  const handleAdd = () => {
    dispatch(startRenew());
    setOpenModal(true);
  };
  //cerrar modal y limpiar usuario activo
  const handleOnClose = () => {
    setOpenModal(false);
    dispatch(cleanActiveUser());
  };
  //Eliminar usuario
  const handleEliminarUser = () => {
    QuestionSwall.fire().then((result) => {
      if (result.value) {
        dispatch(startDeleteUser());

        dispatch(startRenew());
      }
    });
  };

  //modal child para cambiar contraseña
  const ChildModal = () => {
    const handleOpen = () => {
      setOpenChildren(true);
    };
    const handleClose = () => {
      setOpenChildren(false);
    };

    return (
      <>
        <div hidden={ActiveUser ? false : true}>
          <a className="btn btn-warning" onClick={handleOpen}>
            <i className="fas fa-lock-open"></i>
          </a>
        </div>
        <Modal
          hideBackdrop
          open={openChildren}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={styleChildren}>
            <Typography variant="h5" id="modal-modal-title">
              Cambiar contraseña
            </Typography>
            <Formik {...FormikPropsChildren}>
              {(form) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-lock"></i> Password
                    </label>
                    <Field
                      className="form-control"
                      type="password"
                      name="passwordC"
                      style={
                        form.touched.passwordC &&
                        form.errors.passwordC && { border: "1px solid red" }
                      }
                      autoComplete="off"
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="passwordC" component="div" />
                    </div>
                  </div>

                  <div className="d-flex justify-content-around mb-3">
                    <button className="btn btn-primary" type="submit">
                      Cambiar Contraseña
                    </button>

                    <a className="btn btn-danger" onClick={handleClose}>
                      Cancelar
                    </a>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </>
    );
  };

  return (
    <>
      <div>
        <h1>Listado de Usuarios</h1>
      </div>
      {loadinInfo ? (
        <LoadingInfo />
      ) : (
        <div className="TableInf">
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
             componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
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
                        autoComplete="off"
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
                        autoComplete="off"
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
                        name="area"
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
                      <ChildModal />
                      <button className="btn btn-primary" type="submit">
                        {ActiveUser ? "Editar Usuario" : "Crear Usuario"}
                      </button>
                      <div hidden={ActiveUser ? false : true}>
                        <a
                          className="btn btn-danger"
                          onClick={handleEliminarUser}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </a>
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
      )}
    </>
  );
};
