import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { startLogin } from "../../actions/auth";
import "../../styles/Login.scss";
import { startLoading, stopLoading } from '../../actions/ui';
//interface of the form
interface FormValues {
  usuario: string;
  contrasena: string;
}
export const Login = () => {
  const dispatch = useDispatch();
  const validaciones = (datos: FormValues) => {
    let errores: any = {};
    //validar el nombre
    if (!datos.usuario) errores.usuario = "Escriba su usuario";
    //validar el email
    if (!datos.contrasena) errores.contrasena = "Escribe la contraseña";
    return errores;
  };

  const initialValues: FormValues = {
    usuario: "",
    contrasena: "",
  };

  const onSubmit = async({usuario,contrasena}: FormValues, resetForm: any) => {
    resetForm();
    dispatch(startLoading());
    await dispatch(startLogin(usuario, contrasena));
    dispatch(stopLoading());
    
  };

  return (
    <div className="login">
      <Formik
        onSubmit={(datos, { resetForm }) => {
          onSubmit(datos, resetForm);
        }}
        validate={validaciones}
        initialValues={initialValues}
      >
        {({ errors,touched }) => (
          <div className="login-container">
            <div className="container-login100">
              <div className="wrap-login100 p-t-50 p-b-90 p-1-50 p-r-50">
                <Form className="login100-form flex-sb flex-w">
                  <span className="login100-form-title">
                    <a href="/">
                      <i className="fas fa-user"></i>
                    </a>
                  </span>
                  <div className="wrap-input100 m-b-16">
                    <Field
                      className="input100"
                      type="text"
                      placeholder="Usuario"
                      id="usuario"
                      name="usuario"
                      autoComplete="off"
                    />
                    <span className="focus-input100"></span>
                  </div>
                  {errors.usuario && touched.usuario && (
                    <div className="alert alert-danger alerta" role="alert">
                    {errors.usuario}
                    </div>
                  )}
                  <div className="wrap-input100 m-b-16">
                    <Field
                      className="input100"
                      type="password"
                      placeholder="Contraseña"
                      id="contrasena"
                      name="contrasena"
                      autoComplete="off"
                    />
                    <span className="focus-input100"></span>
                  </div>
                  {
                    errors.contrasena && touched.contrasena && (
                      <div className="alert alert-danger alerta" role="alert">
                      {errors.contrasena}
                      </div>
                    )
                  }
                  <div className="container-login100-form-btn m-t-17">
                    <div className="w-full beforeNone text-center">
                      <input
                        type="submit"
                        className="nv-login-submit login100-form-btn"
                        name="submit"
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
