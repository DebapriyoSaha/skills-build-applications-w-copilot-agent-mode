import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('/api/activities/')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {items.map(a => (
          <li key={a._id}>{a.activity_type} — {a.duration}</li>
        ))}
      </ul>
    </div>
  );
}