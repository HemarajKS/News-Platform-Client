import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';
import ArticleFilter from '../components/ArticleFilter';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles');
                const data = await response.json();
                setArticles(data);
                setFilteredArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleFilterChange = (filters) => {
        const { category, author, tags } = filters;
        const newFilteredArticles = articles.filter(article => {
            const matchesCategory = category ? article.categoryId === category : true;
            const matchesAuthor = author ? article.authorId === author : true;
            const matchesTags = tags.length > 0 ? tags.every(tag => article.tags.includes(tag)) : true;
            return matchesCategory && matchesAuthor && matchesTags;
        });
        setFilteredArticles(newFilteredArticles);
    };

    if (loading) {
        return <div>Loading articles...</div>;
    }

    return (
        <div>
            <h1>Articles</h1>
            <ArticleFilter onFilterChange={handleFilterChange} />
            <ArticleList articles={filteredArticles} />
        </div>
    );
};

export default Home;