import React, { useEffect, useState } from "react";
import ArticleList from "../components/ArticleList";
import ArticleFilter from "../components/ArticleFilter";
import { get } from "../services/api";
import API_LINKS from "../constants/apiLinks";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const [authors, setAuthors] = useState<any>([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    fetchCategories();
    fetchAuthors();
  }, []);

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
          tags={[]}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* <ArticleList articles={filteredArticles} /> */}
      </div>
    </div>
  );
};

export default Home;
