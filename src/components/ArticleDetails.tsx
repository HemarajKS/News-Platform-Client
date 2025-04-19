import React, { useEffect, useState } from "react";

interface Article {
  title: string;
  subtitle: string;
  hero: string;
  description: string;
  published: string;
  author: {
    authorName: string;
  };
  category: {
    categoryName: string;
  };
  tags: string[];
}

const ArticleDetails: React.FC<{ article: Article }> = ({ article }) => {
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

      <h2 className="article-subtitle text-xl font-semibold text-gray-600 mb-4">
        {article.subtitle}
      </h2>
      <div
        className="article-description text-gray-700 leading-relaxed mb-6"
        dangerouslySetInnerHTML={{ __html: article.description }}
      />
      <p className="article-published text-sm text-gray-500 mb-2">
        Published on: {new Date(article.published).toLocaleDateString()}
      </p>
      <p className="article-author text-sm text-gray-500 mb-2">
        Author:{" "}
        <span className="font-medium text-gray-800">
          {article.author.authorName}
        </span>
      </p>
      <p className="article-category text-sm text-gray-500 mb-2">
        Category:{" "}
        <span className="font-medium text-gray-800">
          {article.category.categoryName}
        </span>
      </p>
      <p className="article-tags text-sm text-gray-500">
        Tags:{" "}
        <span className="font-medium text-gray-800">
          {article.tags.join(", ")}
        </span>
      </p>
    </div>
  );
};

export default ArticleDetails;
