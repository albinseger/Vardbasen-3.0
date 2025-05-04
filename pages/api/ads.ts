import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../lib/mongodb';
import Ad from '../../models/Ad';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const ad = new Ad(req.body);
    await ad.save();
    return res.status(201).json(ad);
  }

  if (req.method === 'GET') {
    const ads = await Ad.find().sort({ createdAt: -1 });
    return res.status(200).json(ads);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 