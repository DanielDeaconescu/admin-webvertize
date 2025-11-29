// Dashboard.jsx
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadSubmissions() {
      const res = await fetch('/api/submissions');
      const data = await res.json();
      setEntries(data);
    }
    loadSubmissions();
  }, []);

  return (
    <div>
      <h1>Form Submissions</h1>
      <ul>
        {entries.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong> — {item.email}
            <br />
            {item.message}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
