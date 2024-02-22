import { NextRequest, NextResponse } from 'next/server';
import { createRouter } from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

// Setup for file upload
const date = new Date().getTime();
let filename = '';
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/images/uploads', // destination folder
        filename: (req: any, file: any, cb: any) => cb(null, getFileName(file)),
    }),
});

const getFileName = (file: any) => {
    filename = file.originalname.substring(0, file.originalname.lastIndexOf('.') - 1) + '-' + date + '.' + file.originalname.substring(file.originalname.lastIndexOf('.') + 1, file.originalname.length);
    return filename;
};

// Create a router instance
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

// Export the router handler
// export default router.handler();

// export const config = {
//     api: {
//         bodyParser: false, // Disallow body parsing, consume as stream
//     },
// };

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const onj = {
        body: JSON.stringify({
            fileNames: await Promise.all(
                formData.getAll('files').map(async (file: File) => {
                    return {
                        webkitRelativePath: file.webkitRelativePath,
                        lastModified: file.lastModified,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        buffer: {
                            type: 'Buffer',
                            value: Array.from(new Int8Array(await file.arrayBuffer()).values()),
                        },
                    };
                })
            ),
        }),
    };
    console.log('onj: ', onj);
    return NextResponse.json(onj);
}

// Image upload use multer
// export async function POST(req: NextRequest, res: NextResponse) {
//     const data = await req.formData();
//     console.log('data: ', data);
//     const file = data.get('file');
//     console.log('file: ', file);

//     const uploadMiddleware = upload.array('theFiles');
//     console.log('uploadMiddleware: ', uploadMiddleware);

//     // if (!file) {
//     //     return NextResponse.json({ success: false });
//     // }

//     // const bytes = await file.arrayBuffer();
//     // const buffer = Buffer.from(bytes);

//     return NextResponse.json({ message: 'Succes', req, upload });
// }

export async function GET() {
    return NextResponse.json({ message: 'Succes' });
}

// console.log('req.body: ', req);
// return NextResponse.json({ message: 'Post created', post: req });
