import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, Routes, Route } from 'react-router-dom';
import { starChecking } from '../actions/auth';
import { Topbar } from '../components/topbar/Topbar';
import { UsuariosAdm } from '../components/usuariosAdm/UsuariosAdm';
import { SidebarAdmin } from '../components/sidebar/SidebarAdmin';
import { UseDashboard } from '../hooks/UseDashboard';
import '../styles/admin.scss'

export const AdminDashboardRoutes = () => {
  //logica necesaria para el dashboard
  UseDashboard();
  
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(starChecking());
  }, [location,dispatch]);
  
  return (
    <div className="dashboard">
      <div className="containerP">
        <SidebarAdmin />
        <div className="main">
          <Topbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<UsuariosAdm />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
