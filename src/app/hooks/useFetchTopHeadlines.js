import { useState, useEffect } from "react";

function useFetchTopHeadlines({ sources = "bbc-news" }) {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTopHeadlines() {
      try {
        const response = await fetch(
          `/api/news/gettopheadlines?sources=${sources}`
        );
        const data = await response.json();

        if (response.ok) {
          setArticles(data.articles);
        } else {
          setError(
            data.error || `Failed to fetch top headlines from ${sources}`
          );
        }
      } catch (err) {
        setError("Error fetching top headlines");
      } finally {
        setLoading(false);
      }
    }

    fetchTopHeadlines();
  }, [sources]);

  return { articles, loading, error };
}

export default useFetchTopHeadlines;
