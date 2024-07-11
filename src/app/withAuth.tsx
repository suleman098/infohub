// src/app/withAuth.tsx

"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; // Ensure this import points to your firebase.js

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const [user, loading] = useAuthState(auth);
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push('/login'); // Redirect to login page if not authenticated
            }
        }, [user, loading, router]);

        if (loading) {
            return <div>Loading...</div>; // Show loading state while checking auth
        }

        if (!user) {
            return null; // Return null if not authenticated (will redirect)
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
