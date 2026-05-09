/* eslint-disable react-hooks/set-state-in-effect */

'use client';
import styles from './FeedPage.module.css';
import api from "@/lib/api";
import { useState, useEffect } from "react";
import PostCard from "@/components/postCard";
import CreatePostForm from "@/components/createPost";
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
    id: string;
    createdAt: string;
    content: string;
    Author: {
        id: string;
        username: string;
    };
    likeCount: number;
    isLiked: boolean;
    isFollowing?: boolean;
}

export default function FeedPage() {
    const [post, setPost] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchFeed = async () => {
        try {
            const response = await api.get('/posts/feed');
            setPost(response.data.data || []);
        } catch (error) {
            setError('Не удалось загрузить ленту');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className={styles.feed}>
            <motion.h2
                className={styles.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                Лента
            </motion.h2>
            <CreatePostForm onPostCreated={fetchFeed} />
            {post.length === 0 ? (
                <p className={styles.empty}>Постов пока нету</p>
            ) : (
                <AnimatePresence>
                    {post.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PostCard post={post} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
}