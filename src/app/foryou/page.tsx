import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import styles from './foryou.module.css';

type Article = {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    source: {
        name: string;
    };
};

const ForYouPage: React.FC = () => {
    const [topStories, setTopStories] = useState<Article[]>([]);
    const [breakingNews, setBreakingNews] = useState<Article[]>([]);
    const [mustWatch, setMustWatch] = useState<Article[]>([]);
    const [loadingTopStories, setLoadingTopStories] = useState(true);
    const [loadingBreakingNews, setLoadingBreakingNews] = useState(true);
    const [loadingMustWatch, setLoadingMustWatch] = useState(true);
    const [country, setCountry] = useState<string>('us');

    useEffect(() => {
        const fetchNews = async () => {
            const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

            const storedTopStories = localStorage.getItem('topStories');
            const storedBreakingNews = localStorage.getItem('breakingNews');
            const storedMustWatch = localStorage.getItem('mustWatch');

            if (storedTopStories && storedBreakingNews && storedMustWatch) {
                setTopStories(JSON.parse(storedTopStories).filter((article: Article) => article.urlToImage));
                setBreakingNews(JSON.parse(storedBreakingNews).filter((article: Article) => article.urlToImage));
                setMustWatch(JSON.parse(storedMustWatch).filter((article: Article) => article.urlToImage));
                setLoadingTopStories(false);
                setLoadingBreakingNews(false);
                setLoadingMustWatch(false);
            } else {
                try {
                    const topStoriesResponse = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`);
                    const filteredTopStories = topStoriesResponse.data.articles.filter((article: Article) => article.urlToImage);
                    setTopStories(filteredTopStories);
                    localStorage.setItem('topStories', JSON.stringify(filteredTopStories));
                    setLoadingTopStories(false);

                    const breakingNewsResponse = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`);
                    const filteredBreakingNews = breakingNewsResponse.data.articles.filter((article: Article) => article.urlToImage);
                    setBreakingNews(filteredBreakingNews);
                    localStorage.setItem('breakingNews', JSON.stringify(filteredBreakingNews));
                    setLoadingBreakingNews(false);

                    const mustWatchResponse = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=entertainment&apiKey=${apiKey}`);
                    const filteredMustWatch = mustWatchResponse.data.articles.filter((article: Article) => article.urlToImage);
                    setMustWatch(filteredMustWatch);
                    localStorage.setItem('mustWatch', JSON.stringify(filteredMustWatch));
                    setLoadingMustWatch(false);
                } catch (error) {
                    console.error('Error fetching news:', error);
                }
            }
        };

        fetchNews();

        const intervalId = setInterval(() => {
            localStorage.removeItem('topStories');
            localStorage.removeItem('breakingNews');
            localStorage.removeItem('mustWatch');
            setTopStories([]);
            setBreakingNews([]);
            setMustWatch([]);
            fetchNews();
        }, 900000); // 15 minutes in milliseconds

        return () => clearInterval(intervalId);
    }, [country]);

    return (
        <motion.div
            className={styles.container}
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ type: 'spring', stiffness: 50 }}
        >
            <section className={styles.topStories}>
                <h2 className={styles.sectionTitle}>Top Stories</h2>
                <div className={styles.scrollContainer}>
                    {loadingTopStories ? (
                        <div className={styles.spinner}><ClipLoader size={50} color="#0070f3" /></div>
                    ) : (
                        topStories.map((article, index) => (
                            <div key={index} className={styles.article}>
                                <img src={article.urlToImage} alt={article.title} className={styles.image} />
                                <h3 className={styles.articleTitle}>{article.title}</h3>
                                <p className={styles.description}>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.viewMore}>View More</a>
                            </div>
                        ))
                    )}
                </div>
            </section>
            <section className={styles.breakingNews}>
                <h2 className={styles.sectionTitle}>Breaking News</h2>
                <div className={styles.scrollContainer}>
                    {loadingBreakingNews ? (
                        <div className={styles.spinner}><ClipLoader size={50} color="#0070f3" /></div>
                    ) : (
                        breakingNews.map((article, index) => (
                            <div key={index} className={styles.article}>
                                <img src={article.urlToImage} alt={article.title} className={styles.image} />
                                <h3 className={styles.articleTitle}>{article.title}</h3>
                                <p className={styles.description}>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.viewMore}>View More</a>
                            </div>
                        ))
                    )}
                </div>
            </section>
            <section className={styles.mustWatch}>
                <h2 className={styles.sectionTitle}>Must Watch</h2>
                <div className={styles.scrollContainer}>
                    {loadingMustWatch ? (
                        <div className={styles.spinner}><ClipLoader size={50} color="#0070f3" /></div>
                    ) : (
                        mustWatch.map((article, index) => (
                            <div key={index} className={styles.article}>
                                <img src={article.urlToImage} alt={article.title} className={styles.image} />
                                <h3 className={styles.articleTitle}>{article.title}</h3>
                                <p className={styles.description}>{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.viewMore}>View More</a>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </motion.div>
    );
};

export default ForYouPage;
