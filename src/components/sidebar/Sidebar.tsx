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
import { useDispatch } from "react-redux";
import { starChecking, startLogout } from "../../actions/auth";

export const Sidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(starChecking());
  }, [dispatch]);
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
  };
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
              <NavLink to={"/agenda/home"}>
                <span className="icon">
                  <AiOutlineHome />
                </span>
                <span className="title">Home</span>
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
