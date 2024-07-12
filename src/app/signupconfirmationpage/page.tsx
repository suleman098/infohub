"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './confirmation.module.css';

const SignupConfirmationPage: React.FC = () => {
    const router = useRouter();

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.card}>
                <h1 className={styles.title}>Email Verification</h1>
                <p className={styles.message}>A verification email has been sent to your email address. Please verify your email before logging in.</p>
                <button onClick={() => router.push('/login')} className={styles.button}>Back to Login</button>
            </div>
        </motion.div>
    );
};

export default SignupConfirmationPage;
