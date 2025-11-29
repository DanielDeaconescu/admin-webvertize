export default function handler(req, res) {
  const { password } = req.body || {};

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  return res.status(200).json({ token: process.env.ADMIN_TOKEN });
}
