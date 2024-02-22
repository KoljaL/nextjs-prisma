import React, { ReactElement } from 'react';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

async function getAllPosts(): Promise<Post[]> {
    const data = await fetch(`http://localhost:3000/api`);
    const posts = await data.json();
    console.log(posts);
    return posts.posts || [];
}

const Page = async (): Promise<ReactElement> => {
    try {
        const posts: Post[] = await getAllPosts();
        // console.log('posts: ', posts);
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
    } catch (error) {
        console.error('Error fetching posts:', error);
        return (
            <div>
                Error fetching posts <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }
};

export default Page;
