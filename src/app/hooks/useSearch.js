import { useState, useEffect } from "react";

export function useSearch({ query, pageSize, language }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/news/search?q=${query}&pageSize=${pageSize}&language=${language}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch search results");
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [query, pageSize, language]); // Re-run the effect if any of these parameters change

  return { data, loading, error };
}
