import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    auth?.logout();
    navigate("/");
  };

  const role = auth?.user?.role; // ✅ FIXED

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-2 bg-dark text-light vh-100 p-4">
          <h4 className="text-info mb-4">FleetFlow</h4>

          <p className="small text-secondary">
            Logged in as: <span className="text-info">{role}</span>
          </p>

          <nav className="nav flex-column">

            {/* Dashboard - All */}
            <NavLink className="nav-link text-light" to="/dashboard">
              Dashboard
            </NavLink>

            {/* Vehicles - All */}
            <NavLink className="nav-link text-light" to="/vehicles">
              Vehicles
            </NavLink>

            {/* Drivers - All */}
            <NavLink className="nav-link text-light" to="/drivers">
              Drivers
            </NavLink>

            {/* Trips - Manager, Dispatcher, Finance */}
            {(role === "Manager" ||
              role === "Dispatcher" ||
              role === "Finance") && (
              <NavLink className="nav-link text-light" to="/trips">
                Trips
              </NavLink>
            )}

            {/* Expenses - Manager & Finance */}
            {(role === "Manager" || role === "Finance") && (
              <NavLink className="nav-link text-light" to="/expenses">
                Expenses
              </NavLink>
            )}

            {/* Maintenance - Finance Only */}
            {role === "Finance" && (
              <NavLink className="nav-link text-light" to="/maintenance">
                Maintenance
              </NavLink>
            )}

            {/* Analytics - Finance Only */}
            {role === "Finance" && (
              <NavLink className="nav-link text-light" to="/analytics">
                Analytics
              </NavLink>
            )}

          </nav>

          <button
            className="btn btn-outline-info mt-4 w-100"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="col-10 p-4 bg-black text-light">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;