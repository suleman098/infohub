"use client";

import React, { useState, useEffect } from 'react';
import {
    getAuth,
    verifyBeforeUpdateEmail,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import withAuth from '../withAuth';
import styles from './profile.module.css';
import { auth, db } from '../firebase'; // Ensure this import points to your firebase.js

const ProfilePage: React.FC = () => {
    const [user, loading] = useAuthState(auth);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setNewEmail(user.email || '');
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cooldown) {
            setMessage("Please wait before trying again.");
            return;
        }

        if (!user) {
            setMessage("No user is signed in.");
            return;
        }

        try {
            // Re-authenticate the user
            const credential = EmailAuthProvider.credential(user.email!, password);
            await reauthenticateWithCredential(user, credential);

            // Update Firestore with new first name and last name
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                firstName,
                lastName,
            });

            if (newEmail !== user.email) {
                setCooldown(true);
                setVerificationSent(false);
                setModalIsOpen(true);

                // Send verification email to the new email address
                await verifyBeforeUpdateEmail(user, newEmail);

                setVerificationSent(true);
                setMessage('A verification email has been sent to your new email. Please verify it.');
            } else {
                setMessage('Profile updated successfully.');
            }
        } catch (error) {
            setCooldown(false);
            setModalIsOpen(false);
            if (error instanceof Error) {
                console.error("Error updating profile:", error.message);
                setMessage(`Failed to update profile: ${error.message}`);
            } else {
                console.error("Unexpected error", error);
                setMessage('Failed to update profile due to an unknown error');
            }
        }
    };

    const handleModalClose = async () => {
        setModalIsOpen(false);
        router.push('/login'); // Redirect to login page
    };

    useEffect(() => {
        if (verificationSent && modalIsOpen) {
            const intervalId = setInterval(async () => {
                await user?.reload();
                if (user?.emailVerified) {
                    clearInterval(intervalId);
                    await auth.signOut();
                    handleModalClose();
                }
            }, 3000); // Poll every 3 seconds
            return () => clearInterval(intervalId);
        }
    }, [verificationSent, modalIsOpen, user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <motion.div
                className={styles.container}
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                exit={{ x: '-100vw' }}
                transition={{ type: 'spring', stiffness: 50 }}
            >
                <div className={styles.card}>
                    <h1>Profile</h1>
                    {user && (
                        <form onSubmit={handleUpdateProfile} className={styles.form}>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                style={{ color: 'black' }}
                            />
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                style={{ color: 'black' }}
                            />
                            <label htmlFor="newEmail">New Email:</label>
                            <input
                                id="newEmail"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="New Email"
                                style={{ color: 'black' }}
                            />
                            <label htmlFor="password">Current Password:</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Current Password"
                                style={{ color: 'black' }}
                            />
                            <button type="submit" disabled={cooldown}>Save</button>
                        </form>
                    )}
                    {message && <p>{message}</p>}
                </div>
            </motion.div>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Email Verification"
                ariaHideApp={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <h2>Email Verification</h2>
                <p>{message}</p>
                {verificationSent ? (
                    <p>Please check your new email and verify your new email address.</p>
                ) : (
                    <p>Sending verification email...</p>
                )}
                <div className={styles.spinner}></div>
            </Modal>
        </>
    );
};

export default withAuth(ProfilePage);
