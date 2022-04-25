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
              <Route path="/*" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
