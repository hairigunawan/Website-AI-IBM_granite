import type { NextApiRequest, NextApiResponse } from 'next';
import users from '../../../data/users.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return res.status(200).json({ success: true, message: 'Login berhasil' });
  } else {
    return res.status(401).json({ success: false, message: 'Username atau password salah' });
  }
}
