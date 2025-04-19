import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleFilter from './ArticleFilter';
import ArticleDetails from './ArticleDetails';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/articles');
                setArticles(response.data);
                setFilteredArticles(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleFilterChange = (filters) => {
        const { category, author, tag } = filters;
        const filtered = articles.filter(article => {
            return (
                (!category || article.categoryId === category) &&
                (!author || article.authorId === author) &&
                (!tag || article.tags.includes(tag))
            );
        });
        setFilteredArticles(filtered);
    };

    if (loading) return <div>Loading articles...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <ArticleFilter onFilterChange={handleFilterChange} />
            <div>
                {filteredArticles.map(article => (
                    <ArticleDetails key={article.articleId} article={article} />
                ))}
            </div>
        </div>
    );
};

export default ArticleList;