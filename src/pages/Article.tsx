import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleDetails from "../components/ArticleDetails";
import { get } from "../services/api";
import API_LINKS from "../constants/apiLinks";

const Article = () => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = useParams();

  const fetchArticle = async () => {
    setLoading(true);
    if (params.id) {
      const response = (await get(API_LINKS.ARTICLES.GET_EACH(params.id))) as {
        data: any;
      };
      setArticle(response.data);
    } else {
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ArticleDetails article={article} />
    </div>
  );
};

export default Article;
