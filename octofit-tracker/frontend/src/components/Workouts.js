import React, { useEffect, useState } from 'react';

const WORKOUTS_API = 'https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(WORKOUTS_API)
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout, idx) => (
          <li key={idx} className="list-group-item">
            {workout.name}: {workout.description} ({workout.suggested_for})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
