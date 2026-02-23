import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import * as vehicleAPI from "../api/vehicleApi"; // ✅ use API module

// -------------------- TYPES --------------------
interface Vehicle {
  _id: string;
  name: string;
  model: string;
  licensePlate: string;
  capacity: number;
  status: string; // Available | On Trip | In Shop
}

interface Driver {
  _id: string;
  name: string;
  licenseExpiry?: string;
  status: string; // Active | Suspended
}

interface Trip {
  _id: string;
  vehicleId: string;
  driverId: string;
  cargoWeight: number;
  status: string; // Dispatched | Completed
}

interface Expense {
  _id: string;
  vehicle?: string;
  title?: string;
  amount: number;
  category: string; // Fuel | Maintenance | Salary | Other
  type?: string;    // Fuel | Maintenance
  date: string;
}

// -------------------- CONTEXT INTERFACE --------------------
interface FleetContextType {
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  expenses: Expense[];
  addDriver: (d: Partial<Driver>) => Promise<void>;
  deleteDriver: (id: string) => Promise<void>;
  updateDriverStatus: (id: string, status: string) => Promise<void>;
  addVehicle: (v: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  updateVehicleStatus: (id: string, status: string) => Promise<void>;
  addTrip: (t: Partial<Trip>) => Promise<void>;
  completeTrip: (id: string) => Promise<void>;
  addExpense: (e: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

// -------------------- CONTEXT --------------------
export const FleetContext = createContext<FleetContextType | undefined>(undefined);

export const FleetProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const API_BASE = "http://localhost:5000/api";

  // -------------------- FETCH ALL --------------------
  const fetchAll = async () => {
    try {
      const [vRes, dRes, tRes, eRes] = await Promise.all([
        vehicleAPI.getVehicles(),
        axios.get(`${API_BASE}/drivers`),
        axios.get(`${API_BASE}/trips`),
        axios.get(`${API_BASE}/expenses/fuel`),
      ]);
      setVehicles(vRes.data);
      setDrivers(dRes.data);
      setTrips(tRes.data);
      setExpenses(eRes.data);
    } catch (err) {
      console.error("Fetch all error:", err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // -------------------- DRIVERS --------------------
  const addDriver = async (d: Partial<Driver>) => {
    try {
      await axios.post(`${API_BASE}/drivers`, d);
      await fetchAll();
    } catch (err) { console.error("Add driver error:", err); }
  };

  const deleteDriver = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/drivers/${id}`);
      await fetchAll();
    } catch (err) { console.error("Delete driver error:", err); }
  };

  const updateDriverStatus = async (id: string, status: string) => {
    try {
      await axios.put(`${API_BASE}/drivers/${id}`, { status });
      await fetchAll();
    } catch (err) { console.error("Update driver status error:", err); }
  };

  // -------------------- VEHICLES --------------------
  const addVehicle = async (v: Partial<Vehicle>) => {
    try {
      await vehicleAPI.createVehicle(v); // ✅ use vehicleService
      await fetchAll();
    } catch (err) { console.error("Add vehicle error:", err); }
  };

  const deleteVehicle = async (id: string) => {
    try {
      await vehicleAPI.deleteVehicle(id); // ✅ use vehicleService
      await fetchAll();
    } catch (err) { console.error("Delete vehicle error:", err); }
  };

  const updateVehicleStatus = async (id: string, status: string) => {
    try {
      await axios.put(`${API_BASE}/vehicles/${id}`, { status });
      await fetchAll();
    } catch (err) { console.error("Update vehicle status error:", err); }
  };

  // -------------------- TRIPS --------------------
  const addTrip = async (t: Partial<Trip>) => {
    try {
      await axios.post(`${API_BASE}/trips`, t);
      await fetchAll();
    } catch (err) { console.error("Add trip error:", err); }
  };

  const completeTrip = async (id: string) => {
    try {
      await axios.put(`${API_BASE}/trips/${id}/complete`);
      await fetchAll();
    } catch (err) { console.error("Complete trip error:", err); }
  };

  // -------------------- EXPENSES --------------------
  const addExpense = async (e: Partial<Expense>) => {
    try {
      if (!e.amount) return;
      const payload = {
        vehicle: e.vehicle,
        amount: e.amount,
        type: e.category === "Fuel" ? "Fuel" : e.category,
        date: e.date || new Date().toISOString(),
        title: e.title || e.category,
        category: e.category,
      };
      await axios.post(`${API_BASE}/expenses/fuel`, payload);
      await fetchAll();
    } catch (err) {
      console.error("Add expense error:", err);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/expenses/fuel/${id}`);
      await fetchAll();
    } catch (err) { console.error("Delete expense error:", err); }
  };

  // -------------------- PROVIDER --------------------
  return (
    <FleetContext.Provider value={{
      vehicles, drivers, trips, expenses,
      addDriver, deleteDriver, updateDriverStatus,
      addVehicle, deleteVehicle, updateVehicleStatus,
      addTrip, completeTrip, addExpense, deleteExpense
    }}>
      {children}
    </FleetContext.Provider>
  );
};