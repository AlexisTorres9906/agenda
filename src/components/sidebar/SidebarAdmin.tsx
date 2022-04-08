import { useEffect } from 'react'
import { IconContext } from 'react-icons';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearAdmin } from '../../actions/admin';
import { startLogout } from '../../actions/auth';
import nayaritC from "../../assets/nayaritC.svg"

export const SidebarAdmin = () => {
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
  
  
    const handleLogOut = () => {
      dispatch(startLogout());
      dispatch(clearAdmin())
    };
  
    return (
      <div className="sidebar">
        <IconContext.Provider value={{ className: "shared-class" }}>
          <div className="navigation">
            <ul>
              <li >
                <NavLink to={"/"}>
                  <span className="icon">
                    <img src={nayaritC} width="35px" alt="nayarit" />
                  </span>
                  <span>Gobierno de Nayarit</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="hovered" to={"/agenda/admin/"}>
                  <span className="icon">
                    <AiOutlineUser />
                  </span>
                  <span className="title">Usuarios</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="hovered" to={"/agenda/admin/prueba"}>
                  <span className="icon">
                    <AiOutlineUser />
                  </span>
                  <span className="title">Prueba</span>
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
