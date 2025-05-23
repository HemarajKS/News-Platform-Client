import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArticleDetails from "../components/ArticleDetails";
import { get } from "../services/api";
import API_LINKS from "../constants/apiLinks";
import NoDataFound from "../components/NoDataFound";
import PullToRefresh from "react-pull-to-refresh";

const Article = () => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = useParams();

  const fetchArticle = async () => {
    setLoading(true);
    if (params.id) {
      try {
        const response = (await get(
          API_LINKS.ARTICLES.GET_EACH(params.id)
        )) as {
          data: any;
        };
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    } else {
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1); // Go back to the previous page if history exists
    } else {
      navigate("/"); // Redirect to the articles page if no history exists
    }
  };

  const handleRefresh = async () => {
    fetchArticle();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="max-w-6xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition  mx-4 my-8"
        >
          Back
        </button>
        {article && !loading ? (
          <ArticleDetails article={article} />
        ) : (
          <NoDataFound
            message="Oops! The article you're looking for doesn't seem to exist or may have been removed."
            suggestion="You can try browsing other articles, exploring popular categories, or using the search bar to find what you’re looking for."
          />
        )}
      </div>
    </PullToRefresh>
  );
};

export default Article;
