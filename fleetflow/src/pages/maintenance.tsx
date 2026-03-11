import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Maintenance = () => {
  const fleet = useContext(FleetContext);

  const [selectedId, setSelectedId] = useState("");

  if (!fleet) {
    return <div className="p-4 text-light">Loading maintenance data...</div>;
  }

  const { vehicles, updateVehicleStatus } = fleet;

  const availableVehicles = vehicles.filter(v => v.status === "Available");
  const maintenanceVehicles = vehicles.filter(v => v.status === "In Shop");

  const sendToMaintenance = () => {
    if (!selectedId) return;

    updateVehicleStatus(selectedId, "In Shop");
    setSelectedId("");
  };

  const completeMaintenance = (id: string) => {
    updateVehicleStatus(id, "Available");
  };

  return (
    <div className="container-fluid">

      <h3 className="text-info mb-4">Maintenance Center</h3>

      {/* Send to Maintenance */}

      <div className="dashboard-card mb-4">

        <h5 className="mb-3">Send Vehicle to Maintenance</h5>

        <div className="row g-3">

          <div className="col-md-9">
            <select
              className="form-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">Select Vehicle</option>

              {availableVehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.capacity} kg)
                </option>
              ))}

            </select>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-warning w-100"
              onClick={sendToMaintenance}
              disabled={!selectedId}
            >
              Move to Maintenance
            </button>
          </div>

        </div>

      </div>

      {/* Vehicles in Maintenance */}

      <div className="dashboard-card table-responsive">

        {maintenanceVehicles.length === 0 ? (
          <p className="text-secondary">
            No vehicles currently in maintenance
          </p>
        ) : (

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {maintenanceVehicles.map((v) => (
                <tr key={v.id}>

                  <td>{v.name}</td>

                  <td>{v.capacity} kg</td>

                  <td>
                    <span className="badge bg-warning text-dark">
                      In Shop
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => completeMaintenance(v.id)}
                    >
                      Mark Completed
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default Maintenance;