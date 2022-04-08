import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { starChecking, tokenIsValid } from "../actions/auth";
import { Login } from "../components/login/Login";
import { RootState } from "../store/store";
import { DashboardRoutes } from "./DashboardRoutes";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoadingAuth } from "../components/LoadingAuth";
import { AdminDashboardRoutes } from "./AdminDashboardRoutes";
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";

export const AppRoute = () => {
  const dispatch = useDispatch();

  const MINUTE_MS = 40000; 
  const {uid} = useSelector( (state:RootState) => state.auth );


  //revisar si el usuario esta logueado cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tokenIsValid());
      !uid && <Navigate to="/" />
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [dispatch,uid])

  useEffect(() => {
    dispatch(starChecking());
  }, [dispatch]);

  const { checking } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.ui);
  if (checking) {
    return <LoadingAuth />;
  }
  if(isLoading){
    return <LoadingAuth />;
  }                    
  return (
    
    <HashRouter>
      {/* <HashRouter> o <BrowserRouter> revisar el servidor y hacer cambios pertinentes*/}
      <Routes>
        <Route
          path="/*"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/agenda/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/agenda/admin/*"
          element={
            <PrivateRouteAdmin>
              <AdminDashboardRoutes />
            </PrivateRouteAdmin>
          }
        />
      </Routes>
    </HashRouter>
  );
};
