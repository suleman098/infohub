"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import Link from 'next/link';
import styles from './register.module.css';

const RegisterPage: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update profile
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });
            await setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                email,
            });

            // Redirect to main page
            router.push('/');
        } catch (err) {
            setError('Failed to create an account. Please check your details and try again.');
        }
    };

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.card}>
                <img src="/images/logo1.png" alt="Logo" className={styles.logoImage} />
                <h1 className={styles.title}>Sign Up</h1>
                <form onSubmit={handleRegister} className={styles.form}>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className={styles.input}
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className={styles.input}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={styles.input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Sign Up</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.footer}>
                    <p>Already have an account? <Link href="/login" className={styles.link}>Sign In</Link></p>
                </div>
            </div>
        </motion.div>
    );
};

export default RegisterPage;