/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Modal, Typography } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import {
  FormikConfig,
  FormikValues,
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import { useState, useEffect } from "react";
import { BiRename } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetAmbitos,
  startUpdateAmbito,
  startAddAmbito,
  setActiveAmbito,
  cleanActiveAmbito,
  startDeleteAmbito,
  changeResponseOK,
} from "../../actions/admin";
import { startRenew } from "../../actions/auth";
import { styleModal } from "../../helpers/stylesModal";
import { Ambito } from "../../interface/Admin";
import { RootState } from "../../store/store";
import { LoadingInfo } from "../LoadingInfo";
import * as Yup from "yup";
import { QuestionSwall } from "../../helpers/swalls";

const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  { field: "nombre", headerName: " Nombre Ambito", width: 150 },
];
const style = styleModal;

export const AmbitosAdm = () => {
  const dispatch = useDispatch();
  const { Ambitos, ResponseOk, ActiveAmbito } = useSelector(
    (state: RootState) => state.admin.admInformation
  );
  const [openModal, setOpenModal] = useState(false);
  const [loadinInfo, setLoadingInfo] = useState(false);
  const initialValues = ActiveAmbito
    ? {
        nombre: ActiveAmbito.nombre,
      }
    : {
        nombre: "",
      };

  const validationSchema = Yup.object({
    //name with no whiteSpace in the beginning
    nombre: Yup.string().required("El nombre del ambito es requerido"),
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //info de ventana
  useEffect(() => {
    const getAmbitos = async () => {
      setLoadingInfo(true);
      await Promise.all([dispatch(startGetAmbitos())]);
      setLoadingInfo(false);
    };
    getAmbitos();
  }, [dispatch]);

  ////////////////////////////////////////////////////////////////////////////////////////////////

  //config del Formik
  const FormikProps: FormikConfig<FormikValues> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (ActiveAmbito) {
        dispatch(startUpdateAmbito(ActiveAmbito._id, values));
      } else {
        dispatch(startAddAmbito(values as Ambito));
      }
    },
  };

  //click sobre una fila
  const handleClick = (params: any) => {
    setOpenModal(true);
    dispatch(setActiveAmbito(params.row));
    dispatch(startRenew());
  };

  //handleclose modal
  const handleOnClose = () => {
    dispatch(cleanActiveAmbito());
    setOpenModal(false);
  };

  //delete Ambito
  const handleDelete = () => {
    QuestionSwall.fire().then((result) => {
      if (result.value) {
        dispatch(startRenew());
        dispatch(startDeleteAmbito(ActiveAmbito!._id));
      }
    });
  };

  //Add Ambito
  const handleAdd = () => {
    dispatch(startRenew());
    setOpenModal(true);
  };

  //handle consultas
  useEffect(() => {
    if (ResponseOk) {
      //si se creo una consulta y fue correcta cierra el modal y regresa a estado inicial
      setOpenModal(false);
      dispatch(cleanActiveAmbito());
      dispatch(changeResponseOK(false));
    }
  }, [ResponseOk, dispatch]);
  return (
    <>
      <div>
        <h1>Listado de Ambitos</h1>
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
            rows={Ambitos as []}
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
                      {ActiveAmbito ? "Editar Ambito" : "Agregar Ambito"}
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
                        placeholder="Escribe el nombre del ambito"
                        autoComplete="off"
                      />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="nombre" component="div" />
                      </div>
                    </div>

                    <div className="d-flex justify-content-around mb-3">
                      <button className="btn btn-primary" type="submit">
                        {ActiveAmbito ? "Editar Ambito" : "Agregar Ambito"}
                      </button>
                      {ActiveAmbito && (
                        <a className="btn btn-danger" onClick={handleDelete}>
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
