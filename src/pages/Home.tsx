import React, { useEffect, useState } from "react";
import ArticleList from "../components/ArticleList";
import ArticleFilter from "../components/ArticleFilter";
import { get } from "../services/api";
import API_LINKS from "../constants/apiLinks";
import { useSearchParams } from "react-router-dom";
import PullToRefresh from "react-pull-to-refresh";
import NoDataFound from "../components/NoDataFound";

const Home = () => {
  const [articles, setArticles] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [authors, setAuthors] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page
  const [pageSize] = useState(5); // Number of articles per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
    fetchTags();
  }, []);

  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    const authorId = searchParams.get("authorId");
    const tag = searchParams.get("tag");
    const articleType = searchParams.get("articleType");

    const queryParams = new URLSearchParams();

    if (categoryId) queryParams.append("category", categoryId);
    if (authorId) queryParams.append("author", authorId);
    if (tag) queryParams.append("tag", tag);
    if (articleType) queryParams.append("articleType", articleType);

    setPage(1);
    fetchArticles(queryParams.toString(), 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const fetchArticles = async (query: string, page: number) => {
    setLoading(true);
    try {
      const response = (await get(
        `${API_LINKS.ARTICLES.GET_FILTERED}?${query}&page=${page}&pageSize=${pageSize}`
      )) as { data: { articles: any[]; totalPages: number } };
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const categoryId = searchParams.get("categoryId");
    const authorId = searchParams.get("authorId");
    const tag = searchParams.get("tag");
    const articleType = searchParams.get("articleType");

    const queryParams = new URLSearchParams();

    if (categoryId) queryParams.append("category", categoryId);
    if (authorId) queryParams.append("author", authorId);
    if (tag) queryParams.append("tag", tag);
    if (articleType) queryParams.append("articleType", articleType);

    fetchArticles(queryParams.toString(), newPage);
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading articles...</p>
      </div>
    );
  }

  const handleRefresh = () => {
    return new Promise<void>((resolve) => {
      const categoryId = searchParams.get("categoryId");
      const authorId = searchParams.get("authorId");
      const tag = searchParams.get("tag");
      const articleType = searchParams.get("articleType");

      const queryParams = new URLSearchParams();

      if (categoryId) queryParams.append("category", categoryId);
      if (authorId) queryParams.append("author", authorId);
      if (tag) queryParams.append("tag", tag);
      if (articleType) queryParams.append("articleType", articleType);
      setPage(1);
      setArticles([]); // Clear articles before fetching
      setTotalPages(1); // Reset total pages
      fetchArticles(queryParams.toString(), 1);
    });
  };

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
          {articles.length > 0 && !loading ? (
            <ArticleList articles={articles} />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 ${
                page === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } font-semibold rounded-lg hover:bg-blue-600 transition`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </PullToRefresh>
  );
};

export default Home;
