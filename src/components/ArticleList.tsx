import React from "react";

interface Article {
  articleId: string;
  title: string;
  content: string;
  hero: string;
  categoryId: string;
  authorId: string;
  articleType: string;
  tags: string[];
}

const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        // <ArticleDetails key={article.articleId} article={article} />
        <h1>{article.title}</h1>
      ))}
    </div>
  );
};

export default ArticleList;
