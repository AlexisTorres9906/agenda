/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { ErrorMessage,Field,Form, Formik, FormikConfig, FormikValues, useField, useFormikContext } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styleModalChildren } from "../../helpers/stylesModal";
import { RootState } from "../../store/store";
import * as Yup from "yup";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { updateAcuerdo } from "../../Api/sendAcuerdo";
import { updateAcuerdoL } from "../../actions/acuerdo";
import Swal from "sweetalert2";
registerLocale("es", es);
setDefaultLocale("es");

////////////////////////////////////////////////////////////////////////////////////////////////
//DatePicker

const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props as any);
    return (
      <DatePicker
        {...field}
        {...props}
        isClearable={true}
        autoComplete="off"
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        dateFormat="dd/MM/yy"
      />
    );
  };
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  export const Finalizado = () =>{
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
    const {  activeAcuerdo } = useSelector(
      (state: RootState) => state.acuerdos
    );
  
  
    ////////////////////////////////////////////////////////////////////////////////
    //formik 
    const hoy = new Date();
    const FormikPropsChildren: FormikConfig<FormikValues> = {
      initialValues: {
        fechaRCierre:hoy,
        resultado: "",
      },
      validationSchema: Yup.object({
        fechaRCierre: Yup.date().required("Por favor ingrese la fecha de cierre del acuerdo").nullable(),
        resultado: Yup.string().required("Por favor ingrese el resultado del acuerdo"),
      }),
      onSubmit: async (values) => {
          cambiarEstado({
              ...values,
              estatus: "Finalizado",
          })
      },
    };
    ////////////////////////////////////////////////////////////////////////////////
  
    //cambiar estado a finalizado
    const cambiarEstado = (data:object) => {
      updateAcuerdo({...data}, activeAcuerdo?._id as string)
        .then((res) => {
          if (Object.entries(res).length !== 0) {
            dispatch(updateAcuerdoL(res, activeAcuerdo?._id as string));
                  Swal.fire({
                    title: "Finalizado",
                    text: "El acuerdo ha sido finalizado",
                    icon: "success",
                    timer: 2000,
                  });
          }
          setOpenChildren(false);
        })
        .catch((err) => {});
    };
  
  
    ///////////////////////////////////////////////////////////////////////////////
  
    return (
      <>
        <button
          className="col-auto btn btn-finalizar"
          onClick={ handleOpen}
          hidden={ openChildren }
        >
          Finalizar acuerdo
        </button>
        <Modal
          hideBackdrop
          open={openChildren}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={styleChildren}>
            <Typography variant="h5" id="modal-modal-title">
            Finalizar acuerdo
            </Typography>
            <Formik {...FormikPropsChildren}>
              {(form) => (
                <Form>
                   <div className="mb-3">
                      <label className="form-label">
                        <i className="far fa-calendar-alt"></i> Fecha de finalización
                      </label>
                      <DatePickerField
                        name="fechaRCierre"
                        className={`form-control ${
                          form.touched.fechaRCierre &&
                          form.errors.fechaRCierre &&
                          "is-invalid"
                        }`}
                        minDate={activeAcuerdo?.fechaIEjecucion}
                      />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="fechaRCierre" component="div" />
                      </div>
                    </div>

                    <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-file-signature"></i>Resultado
                    </label>
                    <Field
                      as="textarea"
                      name="resultado"
                      className={`form-control ${
                        form.touched.resultado &&
                        form.errors.resultado &&
                        "is-invalid"
                      }`}
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="resultado" component="div" />
                    </div>
                  </div>
  
                  <div className="d-flex justify-content-around mb-3">
                    <button className="btn btn-primary" type="submit">
                      Finalizar
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
  