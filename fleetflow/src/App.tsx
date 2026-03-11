import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
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

  const RoleProtectedRoute = ({
    children,
    allowedRoles,
  }: {
    children: React.ReactNode;
    allowedRoles: string[];
  }) => {
    if (!auth?.user) return <Navigate to="/" replace />;

    if (!allowedRoles.includes(auth.user.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={auth?.user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={auth?.user ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* PROTECTED ROUTES */}

        <Route
          path="/"
          element={auth?.user ? <Layout /> : <Navigate to="/" replace />}
        >

          <Route
            path="dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["Manager","Dispatcher","Safety","Finance"]}>
                <Dashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="vehicles"
            element={
              <RoleProtectedRoute allowedRoles={["Manager","Dispatcher","Finance"]}>
                <Vehicles />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="drivers"
            element={
              <RoleProtectedRoute allowedRoles={["Manager","Safety","Dispatcher","Finance"]}>
                <Drivers />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="trips"
            element={
              <RoleProtectedRoute allowedRoles={["Dispatcher","Manager","Finance"]}>
                <Trips />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="maintenance"
            element={
              <RoleProtectedRoute allowedRoles={["Manager","Finance"]}>
                <Maintenance />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="expenses"
            element={
              <RoleProtectedRoute allowedRoles={["Finance","Manager"]}>
                <Expenses />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="analytics"
            element={
              <RoleProtectedRoute allowedRoles={["Manager","Finance"]}>
                <Analytics />
              </RoleProtectedRoute>
            }
          />

        </Route>

        {/* FALLBACK */}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;