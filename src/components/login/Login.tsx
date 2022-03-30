import { Formik, Form, Field } from "formik";
import "../../styles/Login.scss";
//interface of the form
interface FormValues {
  usuario: string;
  contrasena: string;
}
export const Login = () => {
  const validaciones = (datos: FormValues) => {
    let errores: any = {};
    //validar el nombre
    if (!datos.usuario) errores.nombre = "El nombre es obligatorio";
    //validar el email
    if (!datos.contrasena) errores.correo = "El email es obligatorio";
    return errores;
  };

  const initialValues: FormValues = {
    usuario: "",
    contrasena: "",
  };

  return (
    <div className="login">
      <Formik
        onSubmit={(datos, { resetForm }) => {
          console.log("Form submitted");
          console.log(datos);
          resetForm();
        }}
        validate={validaciones}
        initialValues={initialValues}
      >
        {({ errors }) => (
          <div className="login-container">
            <div className="container-login100">
              <div className="wrap-login100 p-t-50 p-b-90 p-1-50 p-r-50">
                <Form className="login100-form flex-sb flex-w">
                  <span className="login100-form-title">
                    <a href="" target="">
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
