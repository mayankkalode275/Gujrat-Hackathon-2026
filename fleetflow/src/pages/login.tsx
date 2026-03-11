import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Manager");
  const [error, setError] = useState("");

  const roleRoutes: Record<string, string> = {
    Manager: "/dashboard",
    Dispatcher: "/trips",
    Safety: "/drivers",
    Finance: "/analytics",
  };

  useEffect(() => {
    if (user?.role) {
      navigate(roleRoutes[user.role]);
    }
  }, [user, navigate]);

  const handleLogin = () => {
    if (!name || !email) {
      setError("Please enter name and email");
      return;
    }

    login({
      name,
      email,
      role: role as any,
    });
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center">

      <div className="login-container">

        {/* LEFT LOGIN PANEL */}

        <div className="login-panel text-light">

          <h3 className="text-info fw-bold mb-3">
            FleetFlow Login
          </h3>

          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label>Name</label>
            <input
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Select Role</label>
            <select
              className="form-select bg-dark text-light border-secondary"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Manager">Manager</option>
              <option value="Dispatcher">Dispatcher</option>
              <option value="Safety">Safety</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <button
            className="btn btn-info w-100 fw-semibold"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>

        {/* RIGHT SIDE INFO PANEL */}

        <div className="register-panel text-center text-light d-flex flex-column justify-content-center">

          <h4 className="fw-bold mb-3">FleetFlow</h4>

          <p className="text-secondary">
            Smart Fleet & Logistics Management System
          </p>

          <p className="small text-secondary mt-2">
            Manage vehicles, drivers, trips and expenses in one place.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;