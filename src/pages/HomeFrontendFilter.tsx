import { useEffect, useState } from "react";
import ArticleList from "../components/ArticleList";
import ArticleFilter from "../components/ArticleFilter";
import { get } from "../services/api";
import API_LINKS from "../constants/apiLinks";
import { useSearchParams } from "react-router-dom";
import PullToRefresh from "react-pull-to-refresh";
import NoDataFound from "../components/NoDataFound";

const HomeFrontendFilter = () => {
  const [articles, setArticles] = useState<any>([]);
  const [originalArticles, setOriginalArticles] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [authors, setAuthors] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
    fetchTags();
    fetchArticles();
  }, []);

  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    const authorId = searchParams.get("authorId");
    const tag = searchParams.get("tag");
    const articleType = searchParams.get("articleType");

    const copiedAricles = [...originalArticles];

    const filteredArticles = copiedAricles.filter((article: any) => {
      return (
        (!categoryId || article.category === categoryId) &&
        (!authorId || article.author === authorId) &&
        (!tag || article.tags.includes(tag)) &&
        (!articleType || article.articleType === articleType)
      );
    });

    setArticles(filteredArticles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, originalArticles]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = (await get(`${API_LINKS.ARTICLES.GET_ALL}`)) as {
        data: any[];
      };
      setArticles(response.data);
      setOriginalArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = (await get(API_LINKS.CATEGORIES.GET_ALL)) as {
        data: any[];
      };
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = (await get(API_LINKS.AUTHORS.GET_ALL)) as {
        data: any[];
      };
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = (await get(API_LINKS.TAGS.GET_ALL)) as {
        data: any[];
      };
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleRefresh = () => {
    return new Promise<void>((resolve) => {
      setArticles([]);
      setOriginalArticles([]);
      const categoryId = searchParams.get("categoryId");
      const authorId = searchParams.get("authorId");
      const tag = searchParams.get("tag");
      const articleType = searchParams.get("articleType");

      const queryParams = new URLSearchParams();

      if (categoryId) queryParams.append("category", categoryId);
      if (authorId) queryParams.append("author", authorId);
      if (tag) queryParams.append("tag", tag);
      if (articleType) queryParams.append("articleType", articleType);

      fetchArticles();
      resolve();
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading articles...</p>
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <ArticleFilter
            categories={categories || []}
            authors={authors || []}
            tags={tags || []}
          />
        </div>
        <div>
          {articles.length > 0 ? (
            <ArticleList articles={articles} />
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </PullToRefresh>
  );
};

export default HomeFrontendFilter;
