import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
    data: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data: Data = req.body;
            const title = data.data.match(/<h1>(.*?)<\/h1>/)?.[1] || 'Untitled';
            const content = data.data.replace(/<h1>(.*?)<\/h1>/, '');
            const savedPost = await prisma.post.create({ data: { title, content } });
            res.status(200).json(savedPost);
        } catch (error) {
            console.error('Error saving post:', error);
            res.status(500).json({ error: 'Error saving post' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
