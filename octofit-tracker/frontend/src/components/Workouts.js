
import React, { useEffect, useState } from 'react';

const WORKOUTS_API = 'https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: '', description: '', suggested_for: '' });

  const fetchWorkouts = () => {
    setLoading(true);
    fetch(WORKOUTS_API)
      .then(res => res.json())
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleShowModal = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWorkout(null);
  };

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);

  const handleAddWorkout = (e) => {
    e.preventDefault();
    // POST to API (not implemented, just UI)
    // Example: fetch(WORKOUTS_API, { method: 'POST', body: ... })
    setShowAddForm(false);
    setNewWorkout({ name: '', description: '', suggested_for: '' });
    // Optionally refresh workouts
    fetchWorkouts();
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title text-secondary">Workouts</h2>
            <div>
              <button className="btn btn-outline-secondary me-2" onClick={fetchWorkouts} disabled={loading}>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              <button className="btn btn-secondary" onClick={handleShowAddForm}>Add Workout</button>
            </div>
          </div>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Suggested For</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={idx}>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>{workout.suggested_for}</td>
                  <td>
                    <button className="btn btn-sm btn-secondary" onClick={() => handleShowModal(workout)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for workout details */}
      {showModal && selectedWorkout && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Workout Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedWorkout.name}</p>
                <p><strong>Description:</strong> {selectedWorkout.description}</p>
                <p><strong>Suggested For:</strong> {selectedWorkout.suggested_for}</p>
                {/* Add more details if available */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for add workout form */}
      {showAddForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Workout</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAddForm}></button>
              </div>
              <form onSubmit={handleAddWorkout}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={newWorkout.name} onChange={e => setNewWorkout({ ...newWorkout, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" value={newWorkout.description} onChange={e => setNewWorkout({ ...newWorkout, description: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Suggested For</label>
                    <input type="text" className="form-control" value={newWorkout.suggested_for} onChange={e => setNewWorkout({ ...newWorkout, suggested_for: e.target.value })} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseAddForm}>Cancel</button>
                  <button type="submit" className="btn btn-secondary">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workouts;
