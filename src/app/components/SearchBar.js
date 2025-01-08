"use client";

import { useState } from "react";
import { useSearch } from "@/app/hooks/useSearch";
import SearchResultCard from "@/app/components/SearchResultCard";

function Search() {
  const [searchquery, setSearchquery] = useState(""); // Query state controlled by parent
  const [pageSize, setPageSize] = useState(5);
  const [language, setLanguage] = useState("en"); // Default language: English

  // Pass all parameters to the useSearch hook
  const { data, loading, error } = useSearch({
    query: searchquery,
    pageSize,
    language,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchquery.trim()) {
      // Trigger search by setting the query (searchquery)
      // The useSearch hook will fetch results based on the query
    }
  };

  return (
    <div className="search-container flex flex-col items-center">
      <form
        onSubmit={handleSearch}
        className="search-form flex items-center gap-4 shadow-lg p-4 rounded-lg border-2 border-gray-300 bg-white"
      >
        {/* Search Input */}
        <input
          type="text"
          value={searchquery}
          onChange={(e) => setSearchquery(e.target.value)} // Update the query on user input
          placeholder="Search for news..."
          className="search-input p-2 border-2 border-gray-300 rounded-md bg-white text-black"
        />

        {/* Page Size Select */}
        <select
          onChange={(e) => setPageSize(Number(e.target.value))}
          value={pageSize}
          className="border-2 border-gray-300 p-2 rounded-md bg-white text-black"
        >
          <option value="5">5 results</option>
          <option value="10">10 results</option>
          <option value="15">15 results</option>
        </select>

        {/* Language Select */}
        <select
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          className="border-2 border-gray-300 p-2 rounded-md bg-white text-black"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Display this div only when searchquery is not empty */}
      {searchquery.trim() && (
        <div className="w-full h-screen overflow-y-auto border-2 border-gray-300 mb-4 shadow-lg">
          {data && data.articles && data.articles.length > 0 ? (
            data.articles.map((article, index) => (
              <div key={index} className="w-full mb-4">
                <SearchResultCard
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  imageUrl={article.urlToImage || "https://via.placeholder.com/150"}
                />
              </div>
            ))
          ) : null}
        </div>
      )}

      {/* Show message if search query is empty */}
      {searchquery.trim() === "" && !loading && !error && (
        <p className="text-center text-black mt-4">Please enter a search query.</p>
      )}
    </div>
  );
}

export default Search;
