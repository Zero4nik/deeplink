'use client';
import styles from './PostPage.module.css';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import PostCard from "@/components/postCard";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import { motion } from 'framer-motion';

interface Comment {
    content: string;
    id: string;
    createdAt: string;
    Author: {
        id: string;
        username: string;
    };
}

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
}

export default function PostPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comment, setComment] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPost = async () => {
        try {
            const [postRes, commentRes] = await Promise.all([
                api.get(`/posts/${id}`),
                api.get(`/posts/${id}/comments`),
            ]);

            setPost(postRes.data);
            setComment(commentRes.data.comments || commentRes.data || []);
        } catch (err) {
            setError('Не удалось загрузить пост');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchPost();
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!post) return <p>Пост не найден</p>;

    return (
        <motion.div
            className={styles.page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <PostCard post={post} />
            <motion.div
                className={styles.commentSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                <h3 className={styles.commentTitle}>Комментарии</h3>
                <CommentForm addComments={fetchPost} postId={id} />
                <CommentList comment={comment} />
            </motion.div>
        </motion.div>
    );
}