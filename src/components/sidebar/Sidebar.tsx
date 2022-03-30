import "../../styles/Sidebar.scss";
import {
  AiFillApple,
  AiOutlineHome,
  AiOutlineDatabase,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
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

  return (
    <div className="sidebar">
      <IconContext.Provider value={{ className: "shared-class" }}>
        <div className="navigation">
          <ul>
            <li>
              <NavLink to={"/home"}>
                <span className="icon">
                  <AiFillApple />
                </span>
                <span>Brand Name</span>
              </NavLink>
            </li>
            <li>
              <NavLink  to={"/agenda/home"}>
                <span className="icon">
                  <AiOutlineHome />
                </span>
                <span className="title">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/agenda/home"}>
                <span className="icon">
                  <AiOutlineDatabase />
                </span>
                <span className="title">Ejemplo1</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/agenda/home"}>
                <span className="icon">
                  <AiOutlineUser />
                </span>
                <span className="title">Ejemplo 2</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"}>
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
