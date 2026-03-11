import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

/* ================= TYPES ================= */

export type Role = "Manager" | "Dispatcher" | "Safety" | "Finance";

interface User {
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (data: { name: string; email: string; role: Role }) => void;
  logout: () => void;
}

/* ================= CONTEXT ================= */

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  /* Load saved user */
  useEffect(() => {
    const stored = localStorage.getItem("fleetflowUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  /* ================= LOGIN ================= */

  const login = (data: { name: string; email: string; role: Role }) => {
    const userData: User = {
      name: data.name,
      email: data.email,
      role: data.role,
    };

    localStorage.setItem("fleetflowUser", JSON.stringify(userData));
    setUser(userData);
  };

  /* ================= LOGOUT ================= */

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fleetflowUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ================= CUSTOM HOOK ================= */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};