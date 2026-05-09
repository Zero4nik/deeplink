/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import styles from './ProfilePage.module.css';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import PostCard from "@/components/postCard";
import LikedBtn from "@/components/FollowButton";
import { motion } from 'framer-motion';

interface User {
    id: string;
    email: string;
    username: string;
    followersCount: number;
    followingCount: number;
    postsCount: number;
    isFollowing: boolean;
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

export default function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProfile = async () => {
        try {
            const userRes = await api.get(`/users/${username}`);
            const userData = userRes.data.user || userRes.data;
            setUser(userData);

            if (userData?.id) {
                const postsRes = await api.get(`/posts/user/${userData.id}`);
                setPosts(postsRes.data.posts || postsRes.data.data || []);
            } else {
                setPosts([]);
            }
        } catch (err) {
            setError('Не удалось загрузить профиль');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [username]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!user) return <p>Пользователь не найден</p>;

    return (
        <motion.div
            className={styles.profile}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.header}>
                <p className={styles.username}>{user?.username}</p>
                <div className={styles.stats}>
                    <motion.strong
                        className={styles.stat}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        {user?.postsCount} постов
                    </motion.strong>
                    <motion.strong
                        className={styles.stat}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                    >
                        {user?.followersCount} Подписчиков
                    </motion.strong>
                    <motion.strong
                        className={styles.stat}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                    >
                        {user?.followingCount} Подписок
                    </motion.strong>
                </div>
                <LikedBtn userId={user.id} subscribeIsUser={user?.isFollowing} />
            </div>
            <h3 className={styles.sectionTitle}>Посты</h3>
            {posts.length === 0 ? (
                <p className={styles.empty}>Постов пока нет</p>
            ) : (
                posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
        </motion.div>
    );
}