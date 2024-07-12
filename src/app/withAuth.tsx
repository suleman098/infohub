"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Ensure this import points to your firebase.js
import Modal from 'react-modal';
import styles from './unverifiedModal.module.css';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const [user, loading] = useAuthState(auth);
        const [isVerified, setIsVerified] = useState<boolean | null>(null);
        const router = useRouter();

        useEffect(() => {
            const checkVerification = async () => {
                if (user) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setIsVerified(userDoc.data().verified);
                    } else {
                        setIsVerified(false);
                    }
                }
            };

            if (!loading && user) {
                if (user.emailVerified) {
                    // User email is verified by Firebase Auth
                    setIsVerified(true);
                } else {
                    checkVerification();
                }
            } else if (!loading && !user) {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        }, [user, loading, router]);

        if (loading || isVerified === null) {
            return <div>Loading...</div>; // Show loading state while checking auth
        }

        if (!user || !isVerified) {
            return (
                <Modal
                    isOpen={true}
                    contentLabel="Email Verification Required"
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
                    <h2>Email Verification Required</h2>
                    <p>Please verify your email address to access this page.</p>
                    <p>A verification email has been sent to your email. Please check your inbox and click on the verification link.</p>
                </Modal>
            );
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
