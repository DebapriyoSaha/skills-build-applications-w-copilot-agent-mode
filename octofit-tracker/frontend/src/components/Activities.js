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
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((activity, idx) => (
          <li key={idx} className="list-group-item">
            {activity.activity_type} - {activity.duration} min ({activity.user_email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
