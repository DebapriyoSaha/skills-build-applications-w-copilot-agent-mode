

import React, { useEffect, useState } from 'react';
const ACTIVITIES_API = 'https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [form, setForm] = useState({ activity_type: '', duration: '', user_email: '' });

  useEffect(() => {
    fetch(ACTIVITIES_API)
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  const handleRefresh = () => {
    fetch(ACTIVITIES_API)
      .then(res => res.json())
      .then(data => setActivities(data));
  };

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Example POST request (not functional without backend support)
    // fetch(ACTIVITIES_API, { method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' } })
    //   .then(() => handleRefresh());
    setForm({ activity_type: '', duration: '', user_email: '' });
  };

  const openModal = activity => {
    setSelectedActivity(activity);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title text-primary mb-4">Activities</h2>
          <button className="btn btn-success mb-3" onClick={handleRefresh}>Refresh</button>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">User</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx}>
                  <td>{activity.activity_type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.user_email}</td>
                  <td><button className="btn btn-info btn-sm" onClick={() => openModal(activity)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Add Activity</h4>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <input type="text" className="form-control" name="activity_type" placeholder="Type" value={form.activity_type} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" name="duration" placeholder="Duration" value={form.duration} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <input type="email" className="form-control" name="user_email" placeholder="User Email" value={form.user_email} onChange={handleInputChange} />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal */}
      {showModal && selectedActivity && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Type:</strong> {selectedActivity.activity_type}</p>
                <p><strong>Duration:</strong> {selectedActivity.duration} min</p>
                <p><strong>User:</strong> {selectedActivity.user_email}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;