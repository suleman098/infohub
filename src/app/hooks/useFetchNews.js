import { useState, useEffect } from "react";

function useFetchNews({ country, category }) {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsSources() {
      const queryParams = new URLSearchParams({ country, category });

      try {
        const response = await fetch(
          `/api/news/getnews?${queryParams.toString()}`
        );

        const data = await response.json();

        if (response.ok) {
          setArticles(data.articles);
        } else {
          setError(data.error || "Failed to fetch news sources");
        }
      } catch (err) {
        setError("Error fetching news sources");
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch completes
      }
    }

    fetchNewsSources();
  }, [country, category]);

  return { articles, loading, error };
}

export default useFetchNews;
