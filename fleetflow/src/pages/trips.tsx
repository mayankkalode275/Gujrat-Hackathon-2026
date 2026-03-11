import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Trips = () => {
  const fleet = useContext(FleetContext);

  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");

  if (!fleet) {
    return <div className="p-4 text-light">Loading trips...</div>;
  }

  const { vehicles, drivers, trips, addTrip, completeTrip } = fleet;

  const availableVehicles = vehicles.filter((v) => v.status === "Available");
  const activeDrivers = drivers.filter((d) => d.status === "Active");

  const handleCreateTrip = () => {
    if (!vehicleId || !driverId || !cargoWeight) return;

    addTrip({
      id: Date.now().toString(),
      vehicleId,
      driverId,
      cargoWeight: Number(cargoWeight),
      status: "Dispatched",
    });

    setVehicleId("");
    setDriverId("");
    setCargoWeight("");
  };

  const handleCompleteTrip = (tripId: string) => {
    completeTrip(tripId);
  };

  return (
    <div className="container-fluid">

      <h3 className="text-info mb-4">Dispatch Center</h3>

      {/* CREATE TRIP */}

      <div className="dashboard-card mb-4">

        <h5 className="mb-3">Create Trip</h5>

        <div className="row g-3">

          <div className="col-md-3">
            <select
              className="form-select"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
            >
              <option value="">Select Vehicle</option>

              {availableVehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}

            </select>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
            >
              <option value="">Select Driver</option>

              {activeDrivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}

            </select>
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              placeholder="Cargo Weight"
              value={cargoWeight}
              onChange={(e) => setCargoWeight(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-info w-100"
              onClick={handleCreateTrip}
            >
              Create Trip
            </button>
          </div>

        </div>

      </div>

      {/* TRIPS TABLE */}

      <div className="dashboard-card table-responsive">

        {trips.length === 0 ? (
          <p className="text-secondary">No trips scheduled</p>
        ) : (

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Cargo</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {trips.map((trip) => (
                <tr key={trip.id}>

                  <td>
                    {vehicles.find((v) => v.id === trip.vehicleId)?.name}
                  </td>

                  <td>
                    {drivers.find((d) => d.id === trip.driverId)?.name}
                  </td>

                  <td>{trip.cargoWeight} kg</td>

                  <td>
                    <span
                      className={`badge ${
                        trip.status === "Dispatched"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>

                  <td>

                    {trip.status === "Dispatched" && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleCompleteTrip(trip.id)}
                      >
                        Complete
                      </button>
                    )}

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

export default Trips;