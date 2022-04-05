import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { starChecking } from "../actions/auth";
import { Login } from "../components/login/Login";
import { RootState } from "../store/store";
import { DashboardRoutes } from "./DashboardRoutes";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoadingAuth } from '../components/LoadingAuth';

export const AppRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(starChecking());
  }, [dispatch]);

  const { checking } = useSelector((state: RootState) => state.auth);
  if (checking) {
    return <LoadingAuth/>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
      </Routes>
    </BrowserRouter>
  );
};
