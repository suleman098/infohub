"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './login.module.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState<string | null>(null);
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/'); // Redirect to main page if already logged in
            }
        });
        return () => unsubscribe();
    }, [auth, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/'); // Redirect to home page after successful login
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetMessage('Password reset email sent. Check your inbox.');
            setResetEmail('');
        } catch (err) {
            setResetMessage('Failed to send password reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className={styles.container}
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ type: 'spring', stiffness: 50 }}
        >
            <div className={styles.card}>
                <img src="/images/logo1.png" alt="Logo" className={styles.logoImage} />
                <h1 className={styles.title}>Sign In</h1>
                <form onSubmit={handleLogin} className={styles.form}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={styles.input}
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.footer}>
                    <button onClick={() => setModalOpen(true)} className={styles.linkButton}>
                        Forgot Password?
                    </button>
                    <div className={styles.divider}></div>
                    <Link href="/register" className={styles.buttonSecondary}>
                        Sign Up
                    </Link>
                </div>
            </div>
            {modalOpen && (
                <div className={styles.modal} role="dialog" aria-modal="true">
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>Reset Password</h2>
                        <form onSubmit={handleForgotPassword} className={styles.form}>
                            <input
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                placeholder="Enter your email"
                                className={styles.input}
                                required
                            />
                            <button type="submit" className={styles.button} disabled={loading}>
                                {loading ? 'Sending...' : 'Send Reset Email'}
                            </button>
                        </form>
                        {resetMessage && <p className={styles.message}>{resetMessage}</p>}
                        <button onClick={() => setModalOpen(false)} className={styles.buttonSecondary}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default LoginPage;
