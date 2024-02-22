import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const res = await prisma.post.findMany();
        const formattedPosts = res.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt.toString(),
        }));
        return NextResponse.json({ message: 'Succes', posts: formattedPosts });
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { data } = req.body;
        const post = await prisma.post.create({
            data: {
                title: 'New Post',
                content: data,
            },
        });
        return NextResponse.json({ message: 'Post created', post });
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

// import { createRouter } from 'next-connect';
// import multer from 'multer';
// import { NextApiRequest, NextApiResponse } from 'next';

// // Setup for file upload
// const date = new Date().getTime();
// let filename = '';
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: './public/images/uploads', // destination folder
//         filename: (req: any, file: any, cb: any) => cb(null, getFileName(file)),
//     }),
// });

// const getFileName = (file: any) => {
//     filename = file.originalname.substring(0, file.originalname.lastIndexOf('.') - 1) + '-' + date + '.' + file.originalname.substring(file.originalname.lastIndexOf('.') + 1, file.originalname.length);
//     return filename;
// };

// // Create a router instance
// const router = createRouter();

// // Error handling
// router.onError((error: any, req: NextApiRequest, res: NextApiResponse) => {
//     res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
// });

// router.onNoMatch((req: NextApiRequest, res: NextApiResponse) => {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
// });

// // Define the upload route
// router.use('/upload', upload.array('files')); // Adjust the path as needed

// router.post('/upload', (req: NextApiRequest, res: NextApiResponse) => {
//     // Assuming you want to use a request parameter, you can access it like so:
//     // const { param } = req.query; // If your route is something like /upload/:param
//     res.status(200).json({ filename: `/images/uploads/${filename}` }); // response
// });

// // Export the router handler
// export default router.handler();

// export const config = {
//     api: {
//         bodyParser: false, // Disallow body parsing, consume as stream
//     },
// };
