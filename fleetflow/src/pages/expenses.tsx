import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Expenses = () => {
  const fleet = useContext(FleetContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Fuel");

  if (!fleet) {
    return <div className="p-4 text-light">Loading expenses...</div>;
  }

  const { expenses, addExpense, deleteExpense } = fleet;

  const handleAddExpense = () => {
    if (!title || !amount) return;

    addExpense({
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
    });

    setTitle("");
    setAmount("");
    setCategory("Fuel");
  };

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container-fluid">

      <h3 className="text-info mb-4">Expense Management</h3>

      {/* Add Expense */}

      <div className="dashboard-card mb-4">

        <h5 className="mb-3">Add Expense</h5>

        <div className="row g-3">

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Fuel</option>
              <option>Maintenance</option>
              <option>Salary</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-info w-100"
              onClick={handleAddExpense}
            >
              Add Expense
            </button>
          </div>

        </div>

      </div>

      {/* Total Expense */}

      <div className="dashboard-card mb-4">
        <h5>
          Total Expenses:{" "}
          <span className="text-danger">
            ₹ {totalExpense.toLocaleString()}
          </span>
        </h5>
      </div>

      {/* Expenses Table */}

      <div className="dashboard-card table-responsive">

        {expenses.length === 0 ? (
          <p className="text-secondary">No expenses recorded</p>
        ) : (

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>

                  <td>{e.title}</td>
                  <td>{e.category}</td>
                  <td>₹ {e.amount}</td>
                  <td>{e.date}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteExpense(e.id)}
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

export default Expenses;