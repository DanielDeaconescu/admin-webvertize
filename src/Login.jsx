import { useState } from 'react';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const json = await res.json();
      sessionStorage.setItem('adminToken', json.token);
      onLogin();
    } else {
      setError('Wrong password');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Admin password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Log in</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
