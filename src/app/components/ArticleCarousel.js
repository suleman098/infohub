"use client";
import ArticleCard from "./ArticleCard";
import useFetchNews from "@/app/hooks/useFetchNews";
import Loader from "./Loader";
const ArticleCarousel = ({ country, category }) => {
  const { articles, loading, error } = useFetchNews({ country, category });

  if (error) {
    return <p>{error}</p>;
  }

  if (!country && !category) return;

  return (
    <>
      <h1 className="text-2xl font-semibold text-left mb-2 text-black">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <div className="carousel carousel-center rounded-box w-full h-[400px] space-x-4 border-2 border-gray-300 mb-4 shadow-lg">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <Loader />
          </div>
        ) : (
          articles
            .filter((article) => article.urlToImage)
            .map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))
        )}
      </div>
    </>
  );
};

export default ArticleCarousel;
