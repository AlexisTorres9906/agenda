import "../../styles/home.scss";
import { Head } from "./Head";
import { GridRecientes } from "./GridRecientes";
import { Contacts } from "./Contacts";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Contacto } from "../../interface/Contacto";

export const Home = () => {
  const { contactos } = useSelector((state: RootState) => state.contactos);
  const navigate = useNavigate();
  const onTodos = () => {
    navigate("../contactos", { replace: true });
  }
  return (
    <div className="home">
      <div className="head">
        <Head />
      </div>
      <div className="container ">
        <div className="row inform">
          <div className="col-xl-8 col-sm-11 col-md-6 col-lg-11">
            <GridRecientes />
          </div>
          <div className="col-xl-4 col-sm-6 col-md-4 col-lg-6 contactos">
            <div className="contacts">
              <div className="card">
                <div className="card-header">
                  <div className="container">
                    <div className="row">
                      <div className="col ms-4">
                        <h3>Contactos</h3>
                      </div>
                      <div className="col d-flex justify-content-end me-2">
                        <button onClick={onTodos}>
                          Todos{" "}
                          <span className="fa-solid fa-arrow-right"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-contactos">
                {contactos
                  .filter((contacto: Contacto) => contacto.favorito === true)
                  .map((contacto) => (
                    <Contacts contacto={contacto}  key={contacto._id}/>
                  ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavLink to={"/agenda/FAcuerdos"} className="btn-flotante">
        <span>
          <i className="fas fa-plus"></i>
        </span>
      </NavLink>
    </div>
  );
};
