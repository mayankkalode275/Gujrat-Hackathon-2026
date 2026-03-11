import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Drivers = () => {
  const fleet = useContext(FleetContext);

  const [name, setName] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");

  if (!fleet) {
    return <div className="p-4 text-light">Loading drivers...</div>;
  }

  const { drivers, addDriver, deleteDriver, updateDriverStatus } = fleet;

  const handleAddDriver = () => {
    if (!name || !licenseExpiry) return;

    addDriver({
      id: Date.now().toString(),
      name,
      licenseExpiry,
      status: "Active",
    });

    setName("");
    setLicenseExpiry("");
  };

  return (
    <div className="container-fluid">

      <h3 className="text-info mb-4">Driver Management</h3>

      {/* Add Driver */}

      <div className="dashboard-card mb-4">
        <h5 className="mb-3">Add Driver</h5>

        <div className="row g-3">

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Driver Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <input
              className="form-control"
              type="date"
              value={licenseExpiry}
              onChange={(e) => setLicenseExpiry(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-info w-100"
              onClick={handleAddDriver}
            >
              Add
            </button>
          </div>

        </div>
      </div>

      {/* Drivers Table */}

      <div className="dashboard-card table-responsive">

        {drivers.length === 0 ? (
          <p className="text-secondary">No drivers registered</p>
        ) : (
          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Name</th>
                <th>License Expiry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((d) => (
                <tr key={d.id}>

                  <td>{d.name}</td>

                  <td>{d.licenseExpiry}</td>

                  <td>
                    <span
                      className={`badge ${
                        d.status === "Active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>

                  <td className="d-flex gap-2">

                    <button
                      className={`btn btn-sm ${
                        d.status === "Active"
                          ? "btn-warning"
                          : "btn-success"
                      }`}
                      onClick={() =>
                        updateDriverStatus(
                          d.id,
                          d.status === "Active"
                            ? "Suspended"
                            : "Active"
                        )
                      }
                    >
                      {d.status === "Active"
                        ? "Suspend"
                        : "Activate"}
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteDriver(d.id)}
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

export default Drivers;