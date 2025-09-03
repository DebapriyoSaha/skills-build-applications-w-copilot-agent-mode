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
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-info mb-4">Teams</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={idx}>
                  <td>{team.name}</td>
                  <td>{team.members.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
