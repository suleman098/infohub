"use client";

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ForYouPage from './foryou/page';
import PreferencesPage from './preferences/page';
import Switch from 'react-switch';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import { auth } from './firebase';

const HomePage: React.FC = () => {
    const [activePage, setActivePage] = useState<'foryou' | 'preferences'>('foryou');
    const [user, loading] = useAuthState(auth);

    const togglePage = () => {
        setActivePage(prevPage => (prevPage === 'foryou' ? 'preferences' : 'foryou'));
    };

    useEffect(() => {
        if (!loading && !user) {
            setActivePage('foryou');
        }
    }, [user, loading]);

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.navButtons}>
                {user && (
                    <label className={styles.switchLabel}>
                        <span className={activePage === 'foryou' ? styles.activeLabel : ''}>For You</span>
                        <Switch
                            onChange={togglePage}
                            checked={activePage === 'preferences'}
                            onColor="#0070f3"
                            offColor="#ccc"
                            onHandleColor="#fff"
                            offHandleColor="#fff"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            handleDiameter={28}
                            height={40}
                            width={80}
                            className={styles.switch}
                        />
                        <span className={activePage === 'preferences' ? styles.activeLabel : ''}>Preferences</span>
                    </label>
                )}
            </div>
            <div className={styles.pageContent}>
                {activePage === 'foryou' ? <ForYouPage /> : <PreferencesPage />}
            </div>
        </motion.div>
    );
};

export default HomePage;
