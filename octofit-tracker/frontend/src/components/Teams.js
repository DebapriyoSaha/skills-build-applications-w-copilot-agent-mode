import React, { useEffect, useState } from 'react';

const TEAMS_API = 'https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(TEAMS_API)
      .then(res => res.json())
      .then(data => setTeams(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((team, idx) => (
          <li key={idx} className="list-group-item">
            {team.name} - Members: {team.members.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
