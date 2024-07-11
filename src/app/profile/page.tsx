"use client";

import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion';
import withAuth from '../withAuth';
import styles from './profile.module.css';
import { auth } from '../firebase'; // Ensure this import points to your firebase.js

const ProfilePage: React.FC = () => {
    const [user, loading] = useAuthState(auth);
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phoneNumber || '');
        }
    }, [user]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            try {
                await updateProfile(user, { displayName, photoURL });
                setMessage('Profile updated successfully');
            } catch (err) {
                setMessage('Failed to update profile');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isClient) {
        return null; // Render nothing on the server
    }

    return (
        <motion.div
            className={styles.container}
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ type: 'spring', stiffness: 50 }}
        >
            <div className={styles.card}>
                <h1>Profile</h1>
                {photoURL && <img src={photoURL} alt="Profile" />}
                {user && (
                    <form onSubmit={handleUpdateProfile} className={styles.form}>
                        <label htmlFor="displayName">Name:</label>
                        <input
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Display Name"
                            style={{ color: 'black' }}
                        />
                        <label htmlFor="photoURL">Photo URL:</label>
                        <input
                            id="photoURL"
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="Photo URL"
                            style={{ color: 'black' }}
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            readOnly
                            style={{ color: 'black' }}
                        />
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            id="phoneNumber"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                            style={{ color: 'black' }}
                        />
                        <button type="submit">Save</button>
                    </form>
                )}
                {message && <p>{message}</p>}
            </div>
        </motion.div>
    );
};

export default withAuth(ProfilePage);
