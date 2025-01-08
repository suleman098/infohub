"use client";

import useFetchTopHeadlines from "../hooks/useFetchTopHeadlines";

function TopHeadlines({ sources }) {
  const { articles, loading, error } = useFetchTopHeadlines({ sources });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (articles) {
    console.log(articles);
  }

  return (
    <div className=" mb-4 ">
      <h2 className="text-sm font-semibold text-black border-2 rounded-box text-center text-wrap p-2 mb-2  bg-gray-300 ">
        {sources.toUpperCase()} Top Headlines
      </h2>
      <div className="carousel carousel-vertical rounded-box h-[400px] w-[500px] border-2 ">
        {articles.map((article, index) => (
          <div
            key={index}
            className="carousel-item flex h-[80px] justify-start items-center p-4 border-2 space-x-4 hover:shadow-xl duration-300 "
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-16 h-16 object-cover rounded-md"
              />
            )}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-l font-semibold text-black text-left w-full text-ellipsis hover:text-blue-500 hover:underline overflow-hidden "
            >
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopHeadlines;
