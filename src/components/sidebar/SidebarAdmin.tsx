/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { IconContext } from "react-icons";
import {
  AiFillLock,
  AiOutlineApartment,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearAdmin } from "../../actions/admin";
import { startLogout } from "../../actions/auth";
import nayaritC from "../../assets/nayaritC.svg";
import { RootState } from "../../store/store";
import Swal from "sweetalert2";
import {
  cambiarContraseña,
  generarToken,
  validarToken,
} from "../../Api/tokens";
import { ErrorSwall } from "../../helpers/swalls";

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
  const { name } = useSelector((state: RootState) => state.auth);

  const handleLogOut = () => {
    dispatch(startLogout());
    dispatch(clearAdmin());
  };

  const handleOpenCambiarContraseña = () => {
    Swal.fire({
      title: "¿Quieres Cambiar tu contraseña?",
      text: "Se enviara un token al correo electrónico del sistema para que puedas cambiar tu contraseña.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar",
      cancelButtonText: "No, cancelar",
    }).then(async (result: any) => {
      if (result.value) {
        generarToken()
          .then(async (_: any) => {
            let tokenValido = false;
            let token, contrasena;
            let peticionValida = false;
            do {
              token = await PedirToken();
              token.isConfirmed &&
                validarToken(token.value).then((res) => {
                  console.log(res);
                  tokenValido = res;
                });
                console.log(tokenValido);
            } while (tokenValido !== false);
            do {
              contrasena = await PedirContrasena();
              contrasena.isConfirmed &&
                cambiarContraseña(token.value, contrasena.value).then((res) => {
                  peticionValida = res;
                });
            } while (peticionValida);
          })
          .catch((err: any) => {
            ErrorSwall.fire();
          });
      }
    });
  };

  const PedirToken = async () => {
    return Swal.fire({
      title: "Ingresa tu Token",
      input: "text",
      inputPlaceholder: "Ingresa tu Token",
      showCancelButton: true,
      inputValidator: (value: string) => {
        if (!value) {
          return "Debes ingresar tu Token" as any;
        }
      },
    });
  };

  const PedirContrasena = async () => {
    return Swal.fire({
      title: "Ingresa tu contraseña",
      input: "password",
      inputPlaceholder: "Ingresa tu contraseña",
      showCancelButton: true,
      inputValidator: (value: string) => {
        if (!value || value.length < 6) {
          return "La contraseña debe ser de al menos 6 caracteres" as any;
        }
      },
      inputAttributes: {
        autocomplete: 'off',
        'data-lpignore': 'off',
      }
    });
  };

  return (
    <>
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
                <NavLink to={"/agenda/admin/"}>
                  <span className="icon">
                    <AiOutlineUser />
                  </span>
                  <span className="title">Usuarios</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/agenda/admin/areas"}>
                  <span className="icon">
                    <AiOutlineApartment />
                  </span>
                  <span className="title">Areas</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={"/agenda/admin/categorias"}>
                  <span className="icon">
                    <BiCategory />
                  </span>
                  <span className="title">Categorias</span>
                </NavLink>
              </li>

              <li>
                <NavLink to={"/agenda/admin/ambitos"}>
                  <span className="icon">
                    <VscOpenPreview />
                  </span>
                  <span className="title">Ambitos</span>
                </NavLink>
              </li>

              <li className="pointer">
                <a onClick={handleOpenCambiarContraseña}>
                  <span className="icon">
                    <AiFillLock />
                  </span>
                  <span className="title">Cambiar Contraseña</span>
                </a>
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
    </>
  );
};
