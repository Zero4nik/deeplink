import LikeButton from '@/components/LikeButton';
import FollowButton from '@/components/FollowButton';
import Link from 'next/link';
import styles from './PostCard.module.css';
import { motion } from 'framer-motion';

interface Post {
    id:string
    createdAt:string
    content:string
    Author: {
        id:string
        username:string
    }
    likeCount:number
    isLiked:boolean
}

export default function PostCard({post}:{post:Post}){
    return(
        <motion.article 
            className={styles.card}
            whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(26, 86, 219, 0.1)' }}
            transition={{ duration: 0.2 }}
        >
            <div className={styles.header}>
                <Link href={`/profile/${post.Author.username}`} className={styles.username}>
                    <strong>{post.Author.username}</strong>
                </Link>         
                <FollowButton userId={post.Author.id} subscribeIsUser={false} />
                <span className={styles.date}>{new Date(post.createdAt).toLocaleDateString('ru-RU')}</span>
            </div>
            <Link href={`/post/${post.id}`} className={styles.contentLink}>
                <p className={styles.content}>{post.content}</p>
            </Link>
            <div className={styles.actions}>
                <LikeButton postId={post.id} postIsLiked={post.isLiked} LikedIsCount={post.likeCount} />
            </div>
        </motion.article>
    )
}