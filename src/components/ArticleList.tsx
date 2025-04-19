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
    "https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-3010-622f-8559-adf8ad49eda1/raw?se=2025-04-19T16%3A46%3A05Z&sp=r&sv=2024-08-04&sr=b&scid=70ba4fed-f112-5f9d-86ef-14bfb9d1858e&skoid=de76bc29-7017-43d4-8d90-7a49512bae0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-19T11%3A31%3A53Z&ske=2025-04-20T11%3A31%3A53Z&sks=b&skv=2024-08-04&sig=LRE28CWiewIwYFb3s9Ism0zTgLVN8Wx4RxywnW97kgk%3D";
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
