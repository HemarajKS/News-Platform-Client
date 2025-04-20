import React from "react";
import { useNavigate } from "react-router-dom";

interface Article {
  title: string;
  subtitle: string;
  hero: string;
  description?: string;
  mediaUrl?: string;
  articleType: "TEXT" | "VIDEO" | "AUDIO";
  published: string;
  author: {
    _id: string;
    authorName: string;
    authorImage: string;
    description: string;
  };
  category: {
    _id: string;
    categoryName: string;
  };
  tags: string[];
}

const ArticleDetails: React.FC<{ article: Article }> = ({ article }) => {
  const navigate = useNavigate();
  return (
    <div className="article-details max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg my-6">
      <h1 className="article-title text-3xl font-bold text-gray-800 mb-4">
        {article.title}
      </h1>

      <img
        className="article-hero w-full h-auto rounded-lg mb-6 aspect-[16/9] object-cover"
        src={article.hero}
        alt={article.title}
      />
      <div
        className="relative group w-max"
        onClick={() => navigate(`/?authorId=${article.author._id}`)}
      >
        <div className="article-author flex items-center text-sm text-gray-500 mb-4">
          <span className="font-medium text-gray-800 cursor-pointer hover:underline">
            {article.author.authorName}
          </span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-600">Author</span>
        </div>
        <div className="absolute scale-0 left-0 mt-2 w-64 p-4 bg-white border border-gray-300 shadow-lg rounded-lg opacity-0 group-hover:opacity-100  group-hover:scale-100 transition-opacity duration-300 z-10 max-w-[280px]">
          <div className="flex items-center mb-3">
            <img
              src={article.author.authorImage}
              alt={article.author.authorName}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-bold text-gray-800">
                {article.author.authorName}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{article.author.description}</p>
        </div>
      </div>

      <h2 className="article-subtitle text-xl font-semibold text-gray-600 mb-4">
        {article.subtitle}
      </h2>
      {article.articleType === "TEXT" && (
        <div
          className="article-description text-gray-700 leading-relaxed mb-6 custom-rte-styles"
          dangerouslySetInnerHTML={{ __html: article.description || "" }}
        />
      )}
      {article.articleType === "VIDEO" && (
        <video
          className="article-video w-full h-auto rounded-lg mb-6"
          controls
          src={article.mediaUrl}
        />
      )}
      {article.articleType === "AUDIO" && (
        <audio
          className="article-audio w-full mb-6"
          controls
          src={article.mediaUrl}
        />
      )}
      <p className="article-published text-sm text-gray-500 mb-2">
        Published on: {new Date(article.published).toLocaleDateString()}
      </p>

      <p className="article-category text-sm text-gray-500 mb-2">
        Category:{" "}
        <span
          className="font-medium text-gray-800 cursor-pointer hover:underline"
          onClick={() => navigate(`/?categoryId=${article.category._id}`)}
        >
          {article.category.categoryName}
        </span>
      </p>
      <div className="article-tags text-sm text-gray-500">
        Tags:{" "}
        <div className="flex flex-wrap gap-2 mt-2">
          {article.tags.map((tag, index) => (
            <span
              onClick={() => navigate(`/?tag=${tag}`)}
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
