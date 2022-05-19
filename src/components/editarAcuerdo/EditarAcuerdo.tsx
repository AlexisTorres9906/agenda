/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from "react";
import { useCallbackPrompt } from "../../hooks/useCallbackPrompt";
import "../../styles/agregarAcuerdo.scss";
import { useEffect } from "react";
import DialogBox from "../DialogBox.component";
import {
  Formik,
  FormikConfig,
  FormikValues,
  Form,
  Field,
  useFormikContext,
  useField,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useDispatch, useSelector } from "react-redux";
import { startGetAmbitos, startGetCategorias } from "../../actions/info";
import { RootState } from "../../store/store";
import { updateAcuerdo } from "../../Api/sendAcuerdo";
import { clearActiveAcuerdo, updateAcuerdoL } from "../../actions/acuerdo";
import { useNavigate } from "react-router";
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
      minDate={new Date()}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////
export const EditarAcuerdo = () => {
  //cosas de las animaciones
  const divTabcon = useRef<HTMLDivElement>(null);
  const divTabinv = useRef<HTMLDivElement>(null);
  const anchorTabcon = useRef<HTMLAnchorElement>(null);
  const anchorTabinv = useRef<HTMLAnchorElement>(null);

  //cambios en los tabs
  const handleChangeTab = (e: any) => {
    //eliminate classname of anchor
    divTabcon.current?.classList.remove("active");
    divTabinv.current?.classList.remove("active");
    anchorTabcon.current?.classList.remove("active");
    anchorTabinv.current?.classList.remove("active");
    if (e.target.id === "contenido-tab") {
      divTabcon.current?.classList.add("active");
      anchorTabcon.current?.classList.add("active");
    } else {
      divTabinv.current?.classList.add("active");
      anchorTabinv.current?.classList.add("active");
    }
  };

  const goToNextTab = (e: any) => {
    e.preventDefault();
    divTabinv.current?.classList.add("active");
    anchorTabinv.current?.classList.add("active");
    divTabcon.current?.classList.remove("active");
    anchorTabcon.current?.classList.remove("active");
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //cosas iniciales

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const { Ambitos, Categorias } = useSelector((state: RootState) => state.info);
  const { activeAcuerdo } = useSelector((state: RootState) => state.acuerdos);
  const navigate = useNavigate();
  const envio = useRef(0)
  const valoresIniciales = {
    nombre: activeAcuerdo?.nombre,
    descripcion: activeAcuerdo?.descripcion,
    fechaInstruccion: activeAcuerdo?.fechaInstruccion,
    fechaPCierre: activeAcuerdo?.fechaPCierre,
    prioridad: activeAcuerdo?.prioridad,
    categoria: activeAcuerdo?.categoria._id,
    ambito: activeAcuerdo?.ambito._id,
    lugar: activeAcuerdo?.lugar,
  };
  const initialValues = useRef(valoresIniciales);
  //Saca la información de los select
  useEffect(() => {
    const load = async () => {
      await Promise.all([
        dispatch(startGetCategorias()),
        dispatch(startGetAmbitos()),
      ]);
    };
    load();
  }, [dispatch]);
  //Esto se utiliza para llenar el primer campo del formik en ambitos y categorias
  useEffect(() => {
    initialValues.current.ambito = activeAcuerdo?.ambito._id;
    initialValues.current.categoria = activeAcuerdo?.categoria._id;
  }, [
    Categorias,
    Ambitos,
    initialValues,
    activeAcuerdo?.ambito._id,
    activeAcuerdo?.categoria._id,
  ]);

  useEffect(() => {
    return () => {
      const func = () => {
      if (envio.current!==1) {
        console.log(envio);
        setShowDialog(false);
        dispatch(clearActiveAcuerdo());
      }
    }
    func();
    };
  }, []);

  useEffect(() => {
    if (!showDialog) {
      setShowDialog(false);
    }
  }, [showDialog,setShowDialog]);

  //Utilizo esto para algunos bugs relacionados al Formik que suceden al recargar la pagina
  const FormFormik = () => {
    // Grab values and submitForm from context
    const { values } = useFormikContext();
    let valores = values as any;
    useEffect(() => {
      if (
        valores.nombre !== activeAcuerdo?.nombre ||
        valores.descripcion !== activeAcuerdo?.descripcion ||
        valores.fechaInstruccion !== activeAcuerdo?.fechaInstruccion ||
        valores.fechaPCierre !== activeAcuerdo?.fechaPCierre ||
        valores.lugar !== activeAcuerdo?.lugar ||
        valores.prioridad !== activeAcuerdo?.prioridad ||
        valores.categoria !== activeAcuerdo?.categoria._id ||
        valores.ambito !== activeAcuerdo?.ambito._id
      ) {
        setShowDialog(true);
      } else {
        setShowDialog(false);
      }
    }, [values, valores]);
    return null;
  };

  const enviar = (isValid: boolean) => {
    if(isValid){
      setShowDialog(false);
    } else {
      setShowDialog(true);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //formik

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre del acuerdo es requerido"),
    descripcion: Yup.string().required(
      "La descripción del acuerdo es requerida"
    ),
    //fechaInstruccion must be a date or null
    fechaInstruccion: Yup.date().nullable(),
    //fechaPCierre must be a date or null
    fechaPCierre: Yup.date()
      .nullable()
      .when("fechaInstruccion", {
        is: (val: any) => val !== "",
        // la fecha de inicio debe ser menor a la fecha de finalizacion o null
        then: Yup.date()
          .min(
            Yup.ref("fechaInstruccion"),
            "La fecha de finalización debe ser mayor a la fecha de instrucción"
          )
          .nullable(),
      }),
    categoria: Yup.string().required("La categoria del acuerdo es requerida"),
    ambito: Yup.string().required("El ambito del acuerdo es requerido"),
    lugar: Yup.string().required("El lugar del acuerdo es requerido"),
  });

  const FormikProps: FormikConfig<FormikValues> = {
    initialValues: initialValues.current,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: function (
      values: FormikValues,
      { resetForm }: FormikHelpers<FormikValues>
    ): void | Promise<any> {
      //eliminate nulls
      const valores = { ...values };
      Object.keys(valores).forEach((key) => {
        if (valores[key] === "") {
          delete valores[key];
        }
      });

      updateAcuerdo(valores, activeAcuerdo?._id as string)
        .then((res) => {
          if (Object.entries(res).length !== 0) {
           envio.current = 1;
            dispatch(updateAcuerdoL(res, activeAcuerdo?._id as string));
            navigate("../vAcuerdos", { replace: true });
          }
        })
        .catch((err) => {});
    },
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <section className="acuerdos-form">
      <DialogBox
        // @ts-ignore
        showDialog={showPrompt}
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
      />

      <Formik {...FormikProps}>
        {(form) => (
          <Form>
            <FormFormik />
            <div>
              <h2 className="text-center">Acuerdos</h2>
            </div>
            <div>
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    role="tab"
                    id="contenido-tab"
                    data-bs-toggle="tab"
                    onClick={handleChangeTab}
                    ref={anchorTabcon}
                  >
                    Contenido
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    role="tab"
                    data-bs-toggle="tab"
                    onClick={handleChangeTab}
                    ref={anchorTabinv}
                  >
                    Involucrados
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  id="tab-1"
                  className="tab-pane active"
                  role="tabpanel"
                  ref={divTabcon}
                >
                  <h6>{activeAcuerdo?.folio}</h6>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="far fa-file-alt"></i> Nombre
                    </label>
                    <Field
                      className={`form-control ${
                        form.touched.nombre &&
                        form.errors.nombre &&
                        "is-invalid"
                      }`}
                      type="text"
                      name="nombre"
                      autoComplete="off"
                      placeholder="Escribe el nombre del acuerdo..."
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="nombre" component="div" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-file-signature"></i> Descripción
                    </label>
                    <Field
                      as="textarea"
                      name="descripcion"
                      className={`form-control ${
                        form.touched.descripcion &&
                        form.errors.descripcion &&
                        "is-invalid"
                      }`}
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="descripcion" component="div" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="far fa-calendar-alt"></i> Fecha Instrucción
                    </label>
                    <DatePickerField
                      name="fechaInstruccion"
                      className={`form-control ${
                        form.touched.fechaInstruccion &&
                        form.errors.fechaInstruccion &&
                        "is-invalid"
                      }`}
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="fechaInstruccion" component="div" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <i className="far fa-calendar-check"></i> Fecha programada
                      de cierre
                    </label>
                    <DatePickerField
                      name="fechaPCierre"
                      className={`form-control ${
                        form.touched.fechaPCierre &&
                        form.errors.fechaPCierre &&
                        "is-invalid"
                      }`}
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="fechaPCierre" component="div" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-exclamation"></i> Prioridad
                    </label>
                    <Field
                      as="select"
                      name="prioridad"
                      type="number"
                      className={`form-control ${
                        form.touched.prioridad &&
                        form.errors.prioridad &&
                        "is-invalid"
                      }`}
                    >
                      <optgroup label="Escoge una prioridad">
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                      </optgroup>
                    </Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="prioridad" component="div" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="far fa-list-alt"></i> Categoría
                    </label>
                    <Field
                      as="select"
                      name="categoria"
                      className={`form-control ${
                        form.touched.categoria &&
                        form.errors.categoria &&
                        "is-invalid"
                      }`}
                    >
                      <optgroup label="Selecciona una categoria">
                        {Categorias.map((categoria) => (
                          <option key={categoria._id} value={categoria._id}>
                            {categoria.nombre}
                          </option>
                        ))}
                      </optgroup>
                    </Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="categoria" component="div" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="far fa-building"></i> Ámbito
                    </label>
                    <Field
                      as="select"
                      name="ambito"
                      className={`form-control ${
                        form.touched.ambito &&
                        form.errors.ambito &&
                        "is-invalid"
                      }`}
                    >
                      <optgroup label="Selecciona el ambito">
                        {Ambitos.map((Ambito) => (
                          <option key={Ambito._id} value={Ambito._id}>
                            {Ambito.nombre}
                          </option>
                        ))}
                      </optgroup>
                    </Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="ambito" component="div" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="fas fa-map-marker-alt"></i> Lugar/Domicilio
                    </label>
                    <Field
                      className={`form-control ${
                        form.touched.lugar && form.errors.lugar && "is-invalid"
                      }`}
                      type="text"
                      name="lugar"
                      placeholder="Ingrese un lugar o domicilio..."
                      autoComplete="off"
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="lugar" component="div" />
                    </div>
                  </div>

                  <div className="mb-3 flechaDerecha">
                    <i
                      className="far fa-arrow-alt-circle-right"
                      onClick={goToNextTab}
                    ></i>
                  </div>
                </div>

                <div
                  id="tab-2"
                  className="tab-pane"
                  role="tabpanel"
                  ref={divTabinv}
                >
                  <p>Content for tab 2.</p>
                  {
                    //if form is not valid
                    !form.isValid && (
                      <div className="alert alert-danger" role="alert">
                        <strong>¡Atención!</strong> Debes completar todos los
                        campos obligatorios.
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={()=>enviar(form.isValid)}
              >
                Editar Acuerdo
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};
