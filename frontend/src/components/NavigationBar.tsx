'use client';

import { useAuth } from "@/context/authContext";
import Link from "next/link";
import styles from './Navbar.module.css';

export default function Navbar() {
    const { logout, user } = useAuth();

    return (
        <nav className={styles.nav}>
            <Link href='/' className={styles.logo}>Deeplink</Link>

            {user ? (
                <>
                    <Link href="/feed?create=true" className={styles.createBtn}>Новый пост</Link>
                    <span className={styles.username}>{user.username}</span>
                    <button onClick={logout} className={styles.logoutBtn}>Выйти</button>
                </>
            ) : (
                <>
                    <Link href='/login' className={styles.link}>Войти</Link>
                    <Link href='/register' className={styles.link}>Регистрация</Link>
                </>
            )}
        </nav>
    );
}