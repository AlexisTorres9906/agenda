import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/login/Login";
import { DashboardRoutes } from './DashboardRoutes';

export const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/agenda/*" element={<DashboardRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};
