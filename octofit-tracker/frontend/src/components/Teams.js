
import React, { useEffect, useState } from 'react';

const TEAMS_API = 'https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', members: '' });

  const fetchTeams = () => {
    setLoading(true);
    fetch(TEAMS_API)
      .then(res => res.json())
      .then(data => {
        setTeams(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleShowModal = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);

  const handleAddTeam = (e) => {
    e.preventDefault();
    // POST to API (not implemented, just UI)
    // Example: fetch(TEAMS_API, { method: 'POST', body: ... })
    setShowAddForm(false);
    setNewTeam({ name: '', members: '' });
    // Optionally refresh teams
    fetchTeams();
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title text-info">Teams</h2>
            <div>
              <button className="btn btn-outline-info me-2" onClick={fetchTeams} disabled={loading}>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              <button className="btn btn-info" onClick={handleShowAddForm}>Add Team</button>
            </div>
          </div>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={idx}>
                  <td>{team.name}</td>
                  <td>{team.members.join(', ')}</td>
                  <td>
                    <button className="btn btn-sm btn-info" onClick={() => handleShowModal(team)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for team details */}
      {showModal && selectedTeam && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Team Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedTeam.name}</p>
                <p><strong>Members:</strong> {selectedTeam.members.join(', ')}</p>
                {/* Add more details if available */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for add team form */}
      {showAddForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Team</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAddForm}></button>
              </div>
              <form onSubmit={handleAddTeam}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Team Name</label>
                    <input type="text" className="form-control" value={newTeam.name} onChange={e => setNewTeam({ ...newTeam, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Members (comma separated)</label>
                    <input type="text" className="form-control" value={newTeam.members} onChange={e => setNewTeam({ ...newTeam, members: e.target.value })} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseAddForm}>Cancel</button>
                  <button type="submit" className="btn btn-info">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
