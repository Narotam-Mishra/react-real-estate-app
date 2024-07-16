import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './Layout.scss';
import { AuthContextVal } from '../../context/AuthContext';
import { useContext } from 'react';

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

const RequireAuth = () => {
  const { currentUser } = useContext(AuthContextVal)

  if (!currentUser) return <Navigate to="/login" />;

  else{
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth }