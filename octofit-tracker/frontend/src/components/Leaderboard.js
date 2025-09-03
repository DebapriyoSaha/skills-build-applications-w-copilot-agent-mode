import React, { useEffect, useState } from 'react';

const LEADERBOARD_API = 'https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(LEADERBOARD_API)
      .then(res => res.json())
      .then(data => setLeaderboard(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {leaderboard.map((entry, idx) => (
          <li key={idx} className="list-group-item">
            {entry.team_name}: {entry.points} points
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
