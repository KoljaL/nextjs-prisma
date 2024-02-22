import React from 'react';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

interface PostProps {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

interface GetAllPostsProps {
    posts: PostProps[];
}

const getAllPosts: React.FC<GetAllPostsProps> = ({ posts }) => {
    posts.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div className={styles.container}>
            <h1>Posts</h1>
            <Link className={styles.link} href="/newpost">
                Create a new post
            </Link>
            <div>
                {posts.map((post) => (
                    <div key={post.id} className={styles.post}>
                        <h2 className={styles.title}>{post.title}</h2>
                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export async function getStaticProps() {
    try {
        const res = await prisma.post.findMany();
        const posts = res.map((post) => {
            return {
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt.toString(),
            };
        });

        return {
            props: { posts },
            revalidate: 10,
        };
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

export default getAllPosts;
