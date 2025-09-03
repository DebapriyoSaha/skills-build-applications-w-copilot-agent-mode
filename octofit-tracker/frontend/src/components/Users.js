import React, { useEffect, useState } from 'react';

const USERS_API = 'https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/users/';


function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(USERS_API)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-primary mb-4">Users</h2>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
