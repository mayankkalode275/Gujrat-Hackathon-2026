import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Vehicles = () => {
  const fleet = useContext(FleetContext);

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  if (!fleet) {
    return <div className="p-4 text-light">Loading vehicles...</div>;
  }

  const { vehicles, addVehicle, deleteVehicle } = fleet;

  const handleAddVehicle = () => {
    if (!name || !capacity) return;

    addVehicle({
      id: Date.now().toString(),
      name,
      capacity: Number(capacity),
      status: "Available",
    });

    setName("");
    setCapacity("");
  };

  return (
    <div className="container-fluid">

      <h3 className="text-info mb-4">Vehicle Registry</h3>

      {/* ADD VEHICLE */}

      <div className="dashboard-card mb-4">

        <h5 className="mb-3">Register New Vehicle</h5>

        <div className="row g-3">

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Vehicle Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              type="number"
              placeholder="Capacity (kg)"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-info w-100"
              onClick={handleAddVehicle}
            >
              Add Vehicle
            </button>
          </div>

        </div>

      </div>

      {/* VEHICLE TABLE */}

      <div className="dashboard-card table-responsive">

        {vehicles.length === 0 ? (
          <p className="text-secondary">No vehicles registered</p>
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

              {vehicles.map((v) => (
                <tr key={v.id}>

                  <td>{v.name}</td>

                  <td>{v.capacity} kg</td>

                  <td>
                    <span
                      className={`badge ${
                        v.status === "Available"
                          ? "bg-success"
                          : v.status === "In Shop"
                          ? "bg-warning text-dark"
                          : "bg-info"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteVehicle(v.id)}
                    >
                      Delete
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

export default Vehicles;