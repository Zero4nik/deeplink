'use client'
import LoginForm from "@/components/loginForm";
import { motion } from 'framer-motion';

export default function loginPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div>
                <LoginForm />
            </div>
            <p>
                Нету аккаунта? <a href="/register">Зарегестрироваться</a>
            </p>
        </motion.div>
    );
}