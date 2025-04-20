import React from "react";
import { Link } from "react-router-dom";

interface Article {
  articleId: string;
  title: string;
  content: string;
  subtitle: string;
  hero: string;
  categoryId: string;
  authorId: string;
  articleType: string;
  tags: string[];
}

const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const fallbackImage =
    "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";
  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => (
        <Link
          to={`/article/${article.articleId}`}
          key={article.articleId}
          className="no-underline text-inherit"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <img
              src={article.hero}
              alt={article.title}
              className="w-full md:w-48 h-auto rounded-lg aspect-[16/9] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600">{article.subtitle}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ArticleList;
