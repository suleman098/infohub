"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faSignOutAlt, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import styles from './NavBar.module.css';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const NavBar: React.FC = () => {
    const [user, loading] = useAuthState(auth);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hours = new Date().getHours();
        let timeOfDay = 'Good evening';
        if (hours < 12) {
            timeOfDay = 'Good morning';
        } else if (hours < 18) {
            timeOfDay = 'Good afternoon';
        }
        if (user && user.displayName) {
            setGreeting(`${timeOfDay}, ${user.displayName.split(' ')[0]}`);
        }
    }, [user]);

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src="/images/logo1.png" alt="Logo" className={styles.logoImage} />
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/">
                        <FontAwesomeIcon icon={faNewspaper} className={styles.icon} />
                    </Link>
                </li>
                {user && (
                    <li>
                        <Link href="/profile">
                            <FontAwesomeIcon icon={faUser} className={`${styles.icon} ${styles.animatedIcon}`} />
                        </Link>
                    </li>
                )}
                {user ? (
                    <li>
                        <button onClick={handleSignOut} className={styles.signOutButton}>
                            <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon} />
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link href="/login">
                            <FontAwesomeIcon icon={faSignInAlt} className={`${styles.icon} ${styles.animatedIcon}`} />
                        </Link>
                    </li>
                )}
            </ul>
            {user && <div className={styles.greeting}>{greeting}</div>}
        </nav>
    );
};

export default NavBar;
