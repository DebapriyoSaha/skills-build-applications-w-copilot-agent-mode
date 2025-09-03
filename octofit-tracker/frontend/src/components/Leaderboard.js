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
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-warning mb-4">Leaderboard</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.team_name}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
