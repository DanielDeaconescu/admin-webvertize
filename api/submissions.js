import clientPromise from '../lib/mongodb.js';

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('WebvertizeFormSubmissions');
    const collection = db.collection('Webvertize');

    const data = await collection.find({}).sort({ createdAt: -1 }).toArray();

    res.status(200).json({ submissions: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
