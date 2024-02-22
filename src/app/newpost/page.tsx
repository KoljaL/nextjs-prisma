'use client';
export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import Editor from '@/components/editor';
import styles from '@/styles/Home.module.css';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

function Index() {
    const [data, setData] = useState(null);
    const [isEmpty, setEmpty] = useState(true);
    const [showLink, setShowLink] = useState(false);

    const handleEditorContent = (value: any) => {
        setData(value);
        value ? setEmpty(false) : setEmpty(true);
    };

    const handleSavePost = async () => {
        try {
            if (data) {
                setEmpty(true);
                const response = await fetch('../api/savePost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data }),
                });

                if (response.ok) {
                    setShowLink(true);
                    console.log('Post saved successfully!');
                } else {
                    console.error('Error saving post:', response.statusText);
                }

                setEmpty(false);
            }
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>New Post</h1>
            <Editor value={data} onChange={handleEditorContent} />
            {/* <div className="content">{data && <div dangerouslySetInnerHTML={{ __html: data }}></div>}</div> */}

            {showLink ? (
                <Link className={styles.link} href="/">
                    View posts
                </Link>
            ) : (
                <button className={styles.link} onClick={handleSavePost} disabled={isEmpty}>
                    Create Post
                </button>
            )}
        </div>
    );
}

export default Index;
