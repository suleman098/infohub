"use client";

import { useState } from "react";
import { useSearch } from "@/app/hooks/useSearch";
import SearchBar from "@/app/components/SearchBar";
import SearchResultCard from "@/app/components/SearchResultCard";

function Search() {
  const [query, setQuery] = useState("");
  const { data, loading, error } = useSearch(query);

  const handleSearch = (query) => {
    setQuery(query); // Set the query when the user searches
  };

  return (
    <div className="search-container mt-8">
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {data && data.articles && data.articles.length > 0 ? (
          data.articles.map((article, index) => (
            <SearchResultCard
              key={index}
              title={article.title}
              description={article.description}
              url={article.url}
              imageUrl={article.urlToImage || "https://via.placeholder.com/150"}
            />
          ))
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default Search;
