// Dashboard.jsx
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadSubmissions() {
      const token = sessionStorage.getItem('adminToken');

      const res = await fetch('/api/submissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        alert('Unauthorized');
        return;
      }

      const data = await res.json();
      setEntries(data.submissions || []);
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
