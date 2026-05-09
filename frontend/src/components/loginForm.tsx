'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './Form.module.css';
import { motion } from 'framer-motion';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/feed');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Ошибка входа');
            } else {
                setError('Ошибка соединения с сервером');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.form 
            onSubmit={handleSubmit} 
            className={styles.form}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className={styles.title}>Вход</h2>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.field}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
            </div>
            <div className={styles.field}>
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
            </div>
            <motion.button 
                type="submit" 
                disabled={loading} 
                className={styles.submitBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {loading ? 'Загрузка...' : 'Войти'}
            </motion.button>
        </motion.form>
    );
}