"use client";
import ArticleCarousel from "@/app/components/ArticleCarousel";
import TopHeadlines from "@/app/components/TopHeadlines";
function Foryou() {
  return (
    <div className="container mx-auto py-3 overflow-hidden">
      <div className="flex flex-wrap">
        <div className="flex-1 min-w-0">
          <ArticleCarousel country="us" category="technology" />
          <ArticleCarousel country="us" category="business" />
          <ArticleCarousel country="us" category="science" />
        </div>
        <div className="w-full md:w-1/4 md:ml-4 mt-4 md:mt-0">
          <TopHeadlines sources={"cnn"} />
          <TopHeadlines sources={"bbc-news"} />
          <TopHeadlines sources={"abc-news"} />
        </div>
      </div>
    </div>
  );
}

export default Foryou;
