import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);
  useEffect(() => {
  fetch('https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/activity/')
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