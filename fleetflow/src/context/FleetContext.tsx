import { createContext, useState } from "react";
import type { ReactNode } from "react";

/* ================= TYPES ================= */

interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  status: string;
}

interface Driver {
  id: string;
  name: string;
  licenseExpiry?: string;
  status: string;
}

interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  cargoWeight: number;
  status: string;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface FleetContextType {
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  expenses: Expense[];

  addDriver: (d: Driver) => void;
  deleteDriver: (id: string) => void;
  updateDriverStatus: (id: string, status: string) => void;

  addVehicle: (v: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  updateVehicleStatus: (id: string, status: string) => void;

  addTrip: (t: Trip) => void;
  completeTrip: (id: string) => void;

  addExpense: (e: Expense) => void;
  deleteExpense: (id: string) => void;
}

/* ================= CONTEXT ================= */

export const FleetContext = createContext<FleetContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const FleetProvider = ({ children }: { children: ReactNode }) => {
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  /* ================= DRIVERS ================= */

  const addDriver = (driver: Driver) => {
    setDrivers(prev => [...prev, driver]);
  };

  const deleteDriver = (id: string) => {
    setDrivers(prev => prev.filter(d => d.id !== id));
  };

  const updateDriverStatus = (id: string, status: string) => {
    setDrivers(prev =>
      prev.map(d => d.id === id ? { ...d, status } : d)
    );
  };

  /* ================= VEHICLES ================= */

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles(prev => [...prev, vehicle]);
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const updateVehicleStatus = (id: string, status: string) => {
    setVehicles(prev =>
      prev.map(v => v.id === id ? { ...v, status } : v)
    );
  };

  /* ================= TRIPS ================= */

  const addTrip = (trip: Trip) => {
    setTrips(prev => [...prev, trip]);
  };

  const completeTrip = (id: string) => {
    setTrips(prev =>
      prev.map(t => t.id === id ? { ...t, status: "Completed" } : t)
    );
  };

  /* ================= EXPENSES ================= */

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <FleetContext.Provider
      value={{
        vehicles,
        drivers,
        trips,
        expenses,
        addDriver,
        deleteDriver,
        updateDriverStatus,
        addVehicle,
        deleteVehicle,
        updateVehicleStatus,
        addTrip,
        completeTrip,
        addExpense,
        deleteExpense
      }}
    >
      {children}
    </FleetContext.Provider>
  );
};