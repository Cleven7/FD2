import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, category, date } = req.body;
    try {
      const transaction = await prisma.transaction.create({
        data: {
          amount,
          category,
          date: new Date(date),
        },
      });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create transaction' });
    }
  } else if (req.method === 'GET') {
    try {
      const transactions = await prisma.transaction.findMany();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch transactions' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
