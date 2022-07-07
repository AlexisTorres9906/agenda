import "../../styles/Sidebar.scss";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineFileAdd,
  AiOutlineCalendar,
} from "react-icons/ai";
import { RiContactsBookLine } from "react-icons/ri";
import { TiDocumentText } from "react-icons/ti";
import { IconContext } from "react-icons";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import nayaritC from "../../assets/nayaritC.svg";
import { RootState } from "../../store/store";
import { BiMessageRoundedAdd } from "react-icons/bi";

export const Sidebar = () => {
  const dispatch = useDispatch();
  //efecto para la sidebar de seleccion de opciones
  useEffect(() => {
    let list = document.querySelectorAll(".navigation li");
    function activeLink(this: any) {
      list.forEach((item) => item.classList.remove("hovered"));
      this.classList.add("hovered");
    }
    list.forEach((item) => item.addEventListener("mouseover", activeLink));
    return () => {
      list.forEach((item) => item.removeEventListener("mouseover", activeLink));
    };
  }, []);

  const { name } = useSelector((state: RootState) => state.auth);
  const solicitudes = useSelector((state: RootState) => state.solicitudes);
  

  const handleLogOut = () => {
    dispatch(startLogout());
  };

  return (
    <div className="sidebar">
      <IconContext.Provider value={{ className: "shared-class" }}>
        <div className="navigation">
          <ul>
            <li>
              <NavLink to={"/"}>
                <span className="icon">
                  <img src={nayaritC} width="35px" alt="nayarit" />
                </span>
                <span>Gobierno de Nayarit</span>
              </NavLink>
            </li>

            <li className="welcome">
              <NavLink to={"/"}>
                <span>Bienvenido {name}</span>
              </NavLink>
            </li>

            <li>
              <NavLink className="hovered" to={"/agenda/"}>
                <span className="icon">
                  <AiOutlineHome />
                </span>
                <span className="title">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/agenda/FAcuerdos"}>
                <span className="icon">
                  <AiOutlineFileAdd />
                </span>
                <span className="title">Agregar Acuerdos</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/agenda/vAcuerdos"}>
                <span className="icon">
                  <TiDocumentText />
                </span>
                <span className="title">Ver Acuerdos</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/agenda/calendario"}>
                <span className="icon">
                  <AiOutlineCalendar />
                </span>
                <span className="title">Agenda</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/agenda/contactos"}>
                <span className="icon">
                  <RiContactsBookLine />
                </span>
                <span className="title">Contactos</span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/agenda/solicitudes"}>
                <span className="icon">
                  <BiMessageRoundedAdd/>
                  <span className="e-badge e-badge-warning e-badge-notification e-badge-overlap">
                    {solicitudes.length}
                  </span>
                </span>
                <span className="title">
                  Solicitudes
                  
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/agenda"} onClick={handleLogOut}>
                <span className="icon">
                  <AiOutlineLogout />
                </span>
                <span className="title">Cerrar sesión</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </IconContext.Provider>
    </div>
  );
};
