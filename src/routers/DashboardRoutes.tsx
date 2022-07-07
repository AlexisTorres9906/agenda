import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Topbar } from "../components/topbar/Topbar";
import { UseDashboard } from "../hooks/UseDashboard";
import "../styles/Dashboard.scss";
import { Home } from "../components/home/Home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startRenew, tokenIsValid } from '../actions/auth';
import { RootState } from "../store/store";
import { AgregarAcuerdoForm } from '../components/agregarAcuerdo/AgregarAcuerdoForm';
import { Vacuerdos } from '../components/verAcuerdos/Vacuerdos';
import { startGetAcuerdos } from '../actions/acuerdo';
import { EditarAcuerdo } from '../components/editarAcuerdo/EditarAcuerdo';
import { AgregarCompromiso } from "../components/agregarAcuerdo/AgregarCompromiso";
import { Calendario } from '../components/calendario/Calendario';
import { Contactos } from "../components/contactos/Contactos";
import { startGetContactos } from "../actions/contactos";
import { VerSolicitudes } from "../components/solicitudes/VerSolicitudes";
import { startGetSolicitudes } from "../actions/solicitud";
export const DashboardRoutes = () => {
  //logica necesaria para el dashboard
  UseDashboard();

  const MINUTE_MS = 30000;
  const dispatch = useDispatch();
  const {uid} = useSelector( (state:RootState) => state.auth );

  //revisar si el usuario esta logueado cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tokenIsValid());
      !uid && <Navigate to="/" />
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [dispatch,uid])
  
  const location = useLocation();

  useEffect(() => {
    dispatch(startRenew());
  }, [location,dispatch]);
  
  //acuerdos del usuario
  useEffect(() => {
    dispatch(startGetAcuerdos());
    dispatch(startGetContactos());
    dispatch(startGetSolicitudes());
  }, [dispatch])
  


  return (
    <div className="dashboard">
      <div className="containerP">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/FAcuerdos" element={<AgregarAcuerdoForm/>} />
              <Route path="/vAcuerdos" element={<Vacuerdos/>} />
              <Route path="/editarAcuerdo" element={<EditarAcuerdo direccion={""} />} />
              <Route path="/editarAcuerdo/home" element={<EditarAcuerdo direccion={"home"} />} />
              <Route path="/agregarCompromiso" element={<AgregarCompromiso/>} />
              <Route path="/calendario" element={<Calendario/>} />
              <Route path="/contactos" element={<Contactos/>} />
              <Route path="/solicitudes" element={<VerSolicitudes/>} />

              <Route path="/*" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
