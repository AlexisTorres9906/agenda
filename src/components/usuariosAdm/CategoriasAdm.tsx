/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DataGrid, esES } from "@mui/x-data-grid";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikConfig,
  FormikValues,
} from "formik";
import { useState, useEffect } from "react";
import { BiRename } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { styleModal } from "../../helpers/stylesModal";
import { RootState } from "../../store/store";
import * as Yup from "yup";
import { startGetCategorias, cleanActiveCategory, setActiveCategory, startAddCategoria, changeResponseOK, startUpdateCategoria, startDeleteCategoria } from '../../actions/admin';
import { LoadingInfo } from "../LoadingInfo";
import { startRenew } from "../../actions/auth";

const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "nombre", headerName: " Nombre Categoria", width: 150 },
];
const style = styleModal;

export const CategoriasAdm = () => {
  ////////////////////////////////////////////////////////
  //valores y llamadas de inicio de la aplicacion
  const dispatch = useDispatch();
  const { ActiveCategory, Categorias,ResponseOk} = useSelector(
    (state: RootState) => state.admin.admInformation
  );
  const [openModal, setOpenModal] = useState(false);
  const [loadinInfo, setLoadingInfo] = useState(false);
  const initialValues = ActiveCategory
    ? {
        nombre: ActiveCategory.nombre,
      }
    : {
        nombre: "",
      };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //info de ventana
  useEffect(() => {
    const getCategorias = async () => {
      setLoadingInfo(true);
      await Promise.all([dispatch(startGetCategorias())]);
      setLoadingInfo(false);
    };
    getCategorias();
  }, [dispatch]);

  ////////////////////////////////////////////////////////////////////////////////////////////////

  //config del Formik
  const FormikProps: FormikConfig<FormikValues> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(ActiveCategory){
        dispatch(startUpdateCategoria(ActiveCategory._id,values));
      }
      else{
        dispatch(startAddCategoria(values));
      }
    },
  };

  //click sobre una fila
  const handleClick = (params: any) => {
    setOpenModal(true);
    dispatch(setActiveCategory(params.row));
    dispatch(startRenew());
  };

  //handleclose modal
  const handleOnClose = () => {
    dispatch(cleanActiveCategory());
    setOpenModal(false);
  };

  //delete Area
  const handleDeleteCategoria = () => {
    dispatch(startRenew());
    dispatch(startDeleteCategoria(ActiveCategory!._id));
  };
  
  //Add Area
  const handleAdd = () => {
    dispatch(startRenew());
    setOpenModal(true);
  };

  //handle consultas
  useEffect(() => {
    if (ResponseOk) {
      //si se creo una consulta y fue correcta cierra el modal y regresa a estado inicial
      setOpenModal(false);
      dispatch(cleanActiveCategory());
      dispatch(changeResponseOK(false));
    }
  }, [ResponseOk, dispatch]);

  return (
    <>
      <div>
        <h1>Listado de Categorias</h1>
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
            getRowId={(row: any) => row._id}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            columns={columns}
            rows={Categorias as []}
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
                      {ActiveCategory ? "Editar Categoria" : "Agregar Categoria"}
                    </Typography>

                    <div className="mb-3 mt-3">
                      <label className="form-label">
                        <BiRename />
                         Nombre
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        style={
                          form.touched.nombre &&
                          form.errors.nombre && { border: "1px solid red" }
                        }
                        name="nombre"
                        placeholder="Escribe el nombre de la Categoria"
                        autoComplete="off"
                      />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="nombre" component="div" />
                      </div>
                    </div>

                    <div className="d-flex justify-content-around mb-3">
                      <button className="btn btn-primary" type="submit">
                        {ActiveCategory ? "Editar Categoria" : "Agregar Categoria"}
                      </button>
                      {ActiveCategory && (
                        <a
                          className="btn btn-danger"
                          onClick={handleDeleteCategoria}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </a>
                      )}
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
