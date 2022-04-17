/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Typography } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikConfig,
  FormikValues,
} from "formik";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetAreas,
  setActiveArea,
  cleanActiveArea,
  changeResponseOK,
  startDeleteArea
} from "../../actions/admin";
import { startRenew } from "../../actions/auth";
import { styleModal } from "../../helpers/stylesModal";
import { Area } from "../../interface/Areas";
import { RootState } from "../../store/store";
import * as Yup from "yup";
import { BiRename } from "react-icons/bi";
import { startAddArea, startUpdateArea } from '../../actions/admin';
import { LoadingInfo } from '../LoadingInfo';

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "nombre", headerName: " Nombre", width: 150 },
  { field: "nombreCorto", headerName: "Nombre Corto", width: 150 },
];
const style = styleModal;

export const AreasAdm = () => {
  //valores y llamadas de inicio de la aplicacion
  const dispatch = useDispatch();
  const { Areas, ActiveArea,ResponseOk } = useSelector(
    (state: RootState) => state.admin.admInformation
  );
  const [areas, setAreas] = useState([] as Area[]);
  const [openModal, setOpenModal] = useState(false);
  const [loadinInfo, setLoadingInfo] = useState(false);
  const initialValues = ActiveArea
    ? {
        nombre: ActiveArea.nombre,
        nombreCorto: ActiveArea.nombreCorto,
      }
    : {
        nombre: "",
        nombreCorto: "",
      };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    nombreCorto: Yup.string().required("El nombre corto es requerido"),
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //useeffect de inicio de la ventana
  useEffect(() => {
    const getAreas = async () => {
      setLoadingInfo(true);
      await Promise.all([dispatch(startGetAreas())]);
      setLoadingInfo(false);
    }
    getAreas();
  }, [dispatch]);

  //useeffect de carga de areas
  useEffect(() => {
    const areas = Areas.map((area) => {
      const id = area._id;
      return {
        ...area,
        id,
      };
    });
    setAreas(areas);
  }, [Areas]);

  //handleclick sobre tabla
  const handleClick = (params: any) => {
    setOpenModal(true);
    dispatch(startRenew());
    let id = params.row.id;
    delete params.row.id;
    dispatch(setActiveArea(params.row));
    params.row.id = id;
  };

  //handleadd agregar area
  const handleAdd = () => {
    dispatch(startRenew());
    setOpenModal(true);
  };

  //handleclose modal
  const handleOnClose = () => {
    setOpenModal(false);
    dispatch(cleanActiveArea());
  };

  //config del Formik
  const FormikProps: FormikConfig<FormikValues> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(!ActiveArea){
        dispatch(startAddArea(values));
        dispatch(startRenew());
      }else{
        dispatch(startUpdateArea(ActiveArea._id,values));
        dispatch(startRenew());
      } 
    },
  };

   //ver si las consultas son correctas
   useEffect(() => {
    if (ResponseOk) {
      //si se creo una consulta y fue correcta cierra el modal y regresa a estado inicial
      setOpenModal(false);
      dispatch(cleanActiveArea());
      dispatch(changeResponseOK(false));
    }
  }, [ResponseOk, dispatch]);

  //boton de eliminar area
  const handleEliminarArea = () => {
    dispatch(startDeleteArea(ActiveArea!._id));
    dispatch(startRenew());
  };

  return (
    <>
      <div>
        <h1>Listado de Areas</h1>
      </div>
      {loadinInfo ? <LoadingInfo/> :(
              <div className="TableInf">
              <DataGrid
                initialState={{
                  pagination: {
                    pageSize: 10,
                  },
                }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={areas as []}
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
                          {ActiveArea ? "Editar Area" : "Agregar Area"}
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
                            placeholder="Escribe el nombre del area"
                            autoComplete="off"
                          />
                          <div style={{ color: "red" }}>
                            <ErrorMessage name="nombre" component="div" />
                          </div>
                        </div>
      
                        <div className="mb-3">
                          <label className="form-label">
                            <BiRename />
                             Nombre Corto
                          </label>
                          <Field
                            className="form-control"
                            type="text"
                            name="nombreCorto"
                            style={
                              form.touched.nombreCorto &&
                              form.errors.nombreCorto && { border: "1px solid red" }
                            }
                            placeholder="Escribe el Nombre Corto del area"
                            autoComplete="off"
                          />
                          <div style={{ color: "red" }}>
                            <ErrorMessage name="nombreCorto" component="div" />
                          </div>
                        </div>
                        <div className="d-flex justify-content-around mb-3">
                          <button className="btn btn-primary" type="submit">
                            {ActiveArea ? "Editar Area" : "Agregar Area"}
                          </button>
                          {
                              ActiveArea && (
                                  <a className="btn btn-danger" onClick={handleEliminarArea}>
                                  <i className="fas fa-trash-alt"></i>
                                </a>
                              )
                          }
                        
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
      )
      }

    </>
  );
};
