"use client";

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { auth, db } from '../firebase';
import withAuth from '../withAuth';
import styles from './preferences.module.css';
import { categories } from './categories';

type UserPreferences = {
    categories: string[];
};

type Article = {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source: {
        name: string;
    };
};

const PreferencesPage: React.FC = () => {
    const [user, loading] = useAuthState(auth);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [articlesByCategory, setArticlesByCategory] = useState<{ [key: string]: Article[] }>(
        () => JSON.parse(localStorage.getItem('articlesByCategory') || '{}')
    );
    const [loadingCategories, setLoadingCategories] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchPreferences = async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setSelectedCategories(data.preferences?.categories || []);
                    }
                } catch (err) {
                    console.error('Failed to fetch preferences', err);
                }
            }
        };
        fetchPreferences();
    }, [user]);

    useEffect(() => {
        const fetchArticles = async () => {
            const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

            selectedCategories.forEach(async (category) => {
                setLoadingCategories((prev) => ({ ...prev, [category]: true }));
                try {
                    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
                        params: {
                            category: category.toLowerCase(),
                            apiKey,
                            country: 'us',
                        },
                    });
                    const articles = response.data.articles.filter((article: Article) => article.urlToImage);
                    setArticlesByCategory((prev) => {
                        const updated = { ...prev, [category]: articles };
                        localStorage.setItem('articlesByCategory', JSON.stringify(updated));
                        return updated;
                    });
                } catch (error) {
                    console.error(`Failed to fetch articles for category ${category}`, error);
                } finally {
                    setLoadingCategories((prev) => ({ ...prev, [category]: false }));
                }
            });
        };

        if (selectedCategories.length > 0) {
            fetchArticles();
        }

        const intervalId = setInterval(() => {
            localStorage.removeItem('articlesByCategory');
            setArticlesByCategory({});
            fetchArticles();
        }, 900000); // 15 minutes in milliseconds

        return () => clearInterval(intervalId);
    }, [selectedCategories]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategories((prevCategories) => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter((cat) => cat !== category);
            } else {
                return [...prevCategories, category];
            }
        });
    };

    const handleSavePreferences = async () => {
        if (user) {
            try {
                const docRef = doc(db, 'users', user.uid);
                await setDoc(docRef, { preferences: { categories: selectedCategories } }, { merge: true });
                setMessage('Preferences saved successfully');
            } catch (err: any) {
                console.error('Failed to save preferences:', err);
                setMessage(`Failed to save preferences: ${err.message || err}`);
            }
        } else {
            setMessage('User not authenticated');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            className={styles.container}
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ type: 'spring', stiffness: 50 }}
        >
            <h1>Select Your Interests</h1>
            <div className={styles.categoriesContainer}>
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`${styles.categoryButton} ${selectedCategories.includes(category) ? styles.selected : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button onClick={handleSavePreferences} className={styles.saveButton}>
                Save Preferences
            </button>
            {message && <p className={styles.message}>{message}</p>}
            {selectedCategories.map((category, index) => (
                <section key={index} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{category}</h2>
                    <div className={styles.scrollContainer}>
                        {loadingCategories[category] || !articlesByCategory[category]?.length ? (
                            <div className={styles.spinner}>
                                <ClipLoader size={50} color="#0070f3" />
                            </div>
                        ) : (
                            articlesByCategory[category].map((article: Article, idx: number) => (
                                <div key={idx} className={styles.article}>
                                    {article.urlToImage && <img src={article.urlToImage} alt={article.title} className={styles.image} />}
                                    <h3 className={styles.articleTitle}>{article.title}</h3>
                                    <p className={styles.description}>{article.description}</p>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.viewMore}>View More</a>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            ))}
        </motion.div>
    );
};

export default withAuth(PreferencesPage);
