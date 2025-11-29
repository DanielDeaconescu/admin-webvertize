import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');

    if (!token) {
      window.location.href = '/';
      return;
    }

    fetch('/api/submissions', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          sessionStorage.removeItem('adminToken');
          window.location.href = '/';
        }
        return res.json();
      })
      .then((json) => setSubmissions(json.submissions || []));
  }, []);

  return (
    <div>
      <h1>Submissions</h1>
      {submissions.map((s) => (
        <div key={s._id}>
          <p>
            <strong>Name:</strong> {s.name}
          </p>
          <p>
            <strong>Email:</strong> {s.email}
          </p>
          <p>
            <strong>Message:</strong> {s.message}
          </p>
          <p>{new Date(s.createdAt).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
