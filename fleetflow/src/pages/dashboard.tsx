import { useContext } from "react";
import { FleetContext } from "../context/FleetContext";

const Dashboard = () => {
  const fleet = useContext(FleetContext);

  if (!fleet) {
    return <div className="p-4 text-light">Loading dashboard...</div>;
  }

  const totalVehicles = fleet.vehicles.length;
  const available = fleet.vehicles.filter(v => v.status === "Available").length;
  const onTrip = fleet.vehicles.filter(v => v.status === "On Trip").length;
  const inMaintenance = fleet.vehicles.filter(v => v.status === "In Shop").length;

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-info">Command Center</h3>
        <small className="text-secondary">
          Real-time fleet operational overview
        </small>
      </div>

      {/* Stats Cards */}
      <div className="row g-4">

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6 className="text-secondary">Total Vehicles</h6>
            <div className="stat-number text-info">{totalVehicles}</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6 className="text-secondary">Available Fleet</h6>
            <div className="stat-number text-success">{available}</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6 className="text-secondary">On Trip</h6>
            <div className="stat-number text-warning">{onTrip}</div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6 className="text-secondary">In Maintenance</h6>
            <div className="stat-number text-danger">{inMaintenance}</div>
          </div>
        </div>

      </div>

      {/* Extra Dashboard Section */}

      <div className="row mt-4 g-4">

        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 className="mb-3 text-info">Fleet Status Overview</h5>

            <div className="mb-3">
              <small>Available</small>
              <div className="progress mt-1">
                <div
                  className="progress-bar bg-success"
                  style={{ width: totalVehicles ? `${(available / totalVehicles) * 100}%` : "0%" }}
                />
              </div>
            </div>

            <div className="mb-3">
              <small>On Trip</small>
              <div className="progress mt-1">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: totalVehicles ? `${(onTrip / totalVehicles) * 100}%` : "0%" }}
                />
              </div>
            </div>

            <div>
              <small>Maintenance</small>
              <div className="progress mt-1">
                <div
                  className="progress-bar bg-danger"
                  style={{ width: totalVehicles ? `${(inMaintenance / totalVehicles) * 100}%` : "0%" }}
                />
              </div>
            </div>

          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 className="mb-3 text-info">Recent Activity</h5>

            <ul className="list-group list-group-flush bg-transparent">
              <li className="list-group-item bg-transparent text-light border-secondary">
                🚚 Vehicle dispatched successfully
              </li>
              <li className="list-group-item bg-transparent text-light border-secondary">
                🛠 Maintenance scheduled
              </li>
              <li className="list-group-item bg-transparent text-light border-secondary">
                👨‍✈️ Driver status updated
              </li>
              <li className="list-group-item bg-transparent text-light border-secondary">
                📦 Cargo assigned to vehicle
              </li>
            </ul>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;