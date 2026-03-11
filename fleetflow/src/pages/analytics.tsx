import { useContext } from "react";
import { FleetContext } from "../context/FleetContext";

const Analytics = () => {
  const fleet = useContext(FleetContext);

  if (!fleet) {
    return <div className="p-4 text-light">Loading analytics...</div>;
  }

  const { vehicles, drivers, trips, expenses } = fleet;

  /* ================= VEHICLE STATS ================= */

  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.status === "Available").length;
  const onTrip = vehicles.filter(v => v.status === "On Trip").length;
  const inMaintenance = vehicles.filter(v => v.status === "In Shop").length;

  /* ================= DRIVER STATS ================= */

  const activeDrivers = drivers.filter(d => d.status === "Active").length;
  const suspendedDrivers = drivers.filter(d => d.status === "Suspended").length;

  /* ================= TRIP STATS ================= */

  const completedTrips = trips.filter(t => t.status === "Completed").length;
  const dispatchedTrips = trips.filter(t => t.status === "Dispatched").length;

  /* ================= EXPENSE STATS ================= */

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container-fluid">

      <h3 className="mb-4 text-info">Fleet Analytics</h3>

      <div className="row g-4">

        {/* VEHICLES */}

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Total Vehicles</h6>
            <div className="stat-number text-info">{totalVehicles}</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Available</h6>
            <div className="stat-number text-success">{availableVehicles}</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>On Trip</h6>
            <div className="stat-number text-warning">{onTrip}</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Maintenance</h6>
            <div className="stat-number text-danger">{inMaintenance}</div>
          </div>
        </div>

        {/* DRIVERS */}

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Active Drivers</h6>
            <div className="stat-number text-success">{activeDrivers}</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Suspended Drivers</h6>
            <div className="stat-number text-danger">{suspendedDrivers}</div>
          </div>
        </div>

        {/* TRIPS */}

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Completed Trips</h6>
            <div className="stat-number text-success">{completedTrips}</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Dispatched Trips</h6>
            <div className="stat-number text-warning">{dispatchedTrips}</div>
          </div>
        </div>

        {/* EXPENSE */}

        <div className="col-md-6">
          <div className="dashboard-card">
            <h6>Total Expenses</h6>
            <div className="stat-number text-danger">
              ₹ {totalExpense.toLocaleString()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;