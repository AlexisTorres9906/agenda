/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  ErrorMessage,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
} from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styleModalChildren } from "../../helpers/stylesModal";
import { RootState } from "../../store/store";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosPeople } from "react-icons/io";
import { TiContacts } from "react-icons/ti";
import { MultiSelectU } from "../multiSelect/MultiSelectU";


////////////////////////////////////////////////////////////////////////////////

export const AgregarPersonal = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const [openChildren, setOpenChildren] = useState(false);
  const styleChildren = styleModalChildren;
  const dispatch = useDispatch();
  //modal child para cambiar estado a en proceso
  const handleOpen = () => {
    setOpenChildren(true);
  };
  const handleClose = () => {
    setOpenChildren(false);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //esquemas de validacion

  const schema = Yup.object({
    peticiones: Yup.array().required("Debe seleccionar al menos una peticion").min(1, "Debe seleccionar al menos un participante"),
  });


  //formik
  const FormikPropsChildren: FormikConfig<FormikValues> = {
    initialValues: {
        peticiones: [],
    },
    validationSchema: schema,
    onSubmit: async (values) => {
        console.log(values);
    },
  };
  ////////////////////////////////////////////////////////////////////////////////


  return (
    <>
      <div className="col-auto row">
        <div className="col-auto fuente-subtitulo">
          <a id="aContacto" onClick={handleOpen}>
            <IoIosPeople className="mlogo" />
            <p className="d-inline mt-4">
              <u>Agregar Personal</u>
            </p>
          </a>
        </div>
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
            Agregar Personal
          </Typography>
          <Formik {...FormikPropsChildren}>
            {(form) => (
              <Form>
               <div className="mb-3">
                    <label className="form-label">
                      <TiContacts />
                       Agregar Personal
                    </label>
                    <MultiSelectU
                      value={form.values.peticiones}
                      onChange={form.setFieldValue}
                      onBlur={form.setFieldTouched}
                      error={form.errors.peticiones}
                      touched={form.touched.peticiones}
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="peticiones" component="div" />
                    </div>
                  </div>

                <div className="d-flex justify-content-around mb-3">
                  <button className="btn btn-primary" type="submit">
                    Agregar Personal
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
