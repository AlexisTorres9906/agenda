import {  Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Topbar } from "../components/topbar/Topbar";
import { UseDashboard } from "../hooks/UseDashboard";
import "../styles/Dashboard.scss";
import { Home } from "../components/home/Home";
export const DashboardRoutes = () => {
  UseDashboard();
  return (
    <div className="dashboard">
      <div className="containerP">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="content">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/*" element={<Home />} />
              </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
