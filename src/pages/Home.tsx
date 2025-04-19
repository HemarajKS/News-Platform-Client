import React, { useEffect, useState } from "react";
import ArticleList from "../components/ArticleList";
import ArticleFilter from "../components/ArticleFilter";
import { get } from "../services/api";
import API_LINKS from "../constants/apiLinks";
import { useLocation, useSearchParams } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [authors, setAuthors] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [filteredArticles, setFilteredArticles] = useState<any>([]);
  const [loading, setLoading] = useState(true);

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

    fetchArticles(queryParams.toString());
  }, [searchParams]);

  const fetchArticles = async (query: string) => {
    setLoading(true);
    const response = (await get(
      `${API_LINKS.ARTICLES.GET_FILTERED}?${query}`
    )) as { data: any[] };
    setArticles(response.data);
    setFilteredArticles(response.data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const response = (await get(API_LINKS.CATEGORIES.GET_ALL)) as {
      data: any[];
    };
    setCategories(response.data);
  };

  const fetchAuthors = async () => {
    const response = (await get(API_LINKS.AUTHORS.GET_ALL)) as {
      data: any[];
    };
    setAuthors(response.data);
  };

  const fetchTags = async () => {
    const response = (await get(API_LINKS.TAGS.GET_ALL)) as {
      data: any[];
    };
    setTags(response.data);
  };

  if (loading) {
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold">Loading articles...</p>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Articles</h1>
      <div className="mb-6">
        <ArticleFilter
          categories={categories || []}
          authors={authors || []}
          tags={tags || []}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* <ArticleList articles={filteredArticles} /> */}
      </div>
    </div>
  );
};

export default Home;
