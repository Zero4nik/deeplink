'use client';
import LoginForm from '@/components/LoginForm';
import { motion } from 'framer-motion';
import styles from './LoginPage.module.css';

export default function loginPage() {
    return (
        <div className={styles.page}>
            <motion.div
                className={styles.formWrapper}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <LoginForm />
                <p className={styles.footer}>
                    Нету аккаунта? <a href="/register">Зарегестрироваться</a>
                </p>
            </motion.div>
        </div>
    );
}