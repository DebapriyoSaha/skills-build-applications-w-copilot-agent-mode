import React, { useEffect, useState } from 'react';

const ACTIVITIES_API = 'https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/activity/';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(ACTIVITIES_API)
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-primary mb-4">Activities</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">User</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx}>
                  <td>{activity.activity_type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.user_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;