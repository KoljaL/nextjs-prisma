const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
    const dummyPosts = [
        { title: 'Dummy Post 1', content: 'This is the content of the first post.' },
        { title: 'Dummy Post 2', content: 'This is the content of the second post.' },
        { title: 'Dummy Post 3', content: 'This is the content of the third post.' },
        { title: 'Dummy Post 4', content: 'This is the content of the fourth post.' },
        { title: 'Dummy Post 5', content: 'This is the content of the fifth post.' },
    ];
    try {
        // await prisma.post.create({ data: post1 });
        dummyPosts.forEach(async (post) => {
            await prisma.post.create({ data: post });
        });
        console.log('Dummy posts created successfully');
    } catch (error) {
        console.error('Error creating dummy posts:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
