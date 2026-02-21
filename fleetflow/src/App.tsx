import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Trips from "./pages/Trips";
import Maintenance from "./pages/Maintenance";
import Expenses from "./pages/Expenses";
import Analytics from "./pages/Analytics";
import Layout from "./components/Layout";

function App() {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const RoleProtectedRoute = ({
    children,
    allowedRoles,
  }: {
    children: JSX.Element;
    allowedRoles: string[];
  }) => {
    if (!auth.role) return <Navigate to="/" replace />;
    if (!allowedRoles.includes(auth.role))
      return <Navigate to="/dashboard" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={
            auth.role ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            auth.role ? <Layout /> : <Navigate to="/" replace />
          }
        >

          {/* DASHBOARD - ALL */}
          <Route
            path="dashboard"
            element={
              <RoleProtectedRoute
                allowedRoles={["Manager", "Dispatcher", "Finance", "Safety"]}
              >
                <Dashboard />
              </RoleProtectedRoute>
            }
          />

          {/* VEHICLES - ALL */}
          <Route
            path="vehicles"
            element={
              <RoleProtectedRoute
                allowedRoles={["Manager", "Dispatcher", "Finance", "Safety"]}
              >
                <Vehicles />
              </RoleProtectedRoute>
            }
          />

          {/* DRIVERS - ALL */}
          <Route
            path="drivers"
            element={
              <RoleProtectedRoute
                allowedRoles={["Manager", "Dispatcher", "Finance", "Safety"]}
              >
                <Drivers />
              </RoleProtectedRoute>
            }
          />

          {/* TRIPS - Manager, Dispatcher, Finance */}
          <Route
            path="trips"
            element={
              <RoleProtectedRoute
                allowedRoles={["Manager", "Dispatcher", "Finance"]}
              >
                <Trips />
              </RoleProtectedRoute>
            }
          />

          {/* EXPENSES - Manager & Finance */}
          <Route
            path="expenses"
            element={
              <RoleProtectedRoute
                allowedRoles={["Manager", "Finance"]}
              >
                <Expenses />
              </RoleProtectedRoute>
            }
          />

          {/* MAINTENANCE - Finance Only */}
          <Route
            path="maintenance"
            element={
              <RoleProtectedRoute
                allowedRoles={["Finance"]}
              >
                <Maintenance />
              </RoleProtectedRoute>
            }
          />

          {/* ANALYTICS - Finance Only */}
          <Route
            path="analytics"
            element={
              <RoleProtectedRoute
                allowedRoles={["Finance"]}
              >
                <Analytics />
              </RoleProtectedRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;