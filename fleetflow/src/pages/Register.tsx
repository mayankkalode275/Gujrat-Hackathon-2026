import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type Role = "Manager" | "Dispatcher" | "Safety" | "Finance";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Manager");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!name || !email) {
      setError("All fields are required");
      return;
    }

    const newUser = { name, email, role };

    localStorage.setItem("fleetflowUser", JSON.stringify(newUser));

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center">

      <div className="glass-card text-light">

        <h3 className="text-info text-center mb-4">
          FleetFlow Registration
        </h3>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label>Full Name</label>
          <input
            className="form-control bg-dark text-light"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control bg-dark text-light"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Select Role</label>
          <select
            className="form-select bg-dark text-light"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="Manager">Fleet Manager</option>
            <option value="Dispatcher">Dispatcher</option>
            <option value="Safety">Safety Officer</option>
            <option value="Finance">Financial Analyst</option>
          </select>
        </div>

        <button
          className="btn btn-info w-100"
          onClick={handleRegister}
        >
          Register
        </button>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/" className="text-info">
              Login
            </Link>
          </small>
        </div>

      </div>

    </div>
  );
};

export default Register;