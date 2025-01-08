"useclient";

import Button from "./Button";
function ArticleCard({ article }) {
  return (
    <div className="carousel-item">
      <div className="card bg-white border-2 border-gray-300 shadow-xl rounded-xl flex flex-col justify-between w-[400px] h-[400px] transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <figure className="px-4 pt-4">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="rounded-xl h-40 object-cover w-full"
          />
        </figure>
        <div className="card-body text-black text-center px-4 py-4 flex-1">
          <h2 className="card-title text-black text-lg overflow-hidden line-clamp-2">
            {article.title}
          </h2>
          <p className="text-black text-sm max-h-16 overflow-hidden">
            {article.description}
          </p>
          <div className="flex-grow flex items-center justify-center">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <Button>Read More</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
