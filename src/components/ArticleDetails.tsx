import React, { useEffect, useState } from 'react';

const ArticleDetails = ({ match }) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const articleId = match.params.id;

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/articles/${articleId}`);
                const data = await response.json();
                if (data.status === 1) {
                    setArticle(data.data);
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [articleId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <div>Article not found.</div>;
    }

    return (
        <div>
            <h1>{article.title}</h1>
            <h2>{article.Subtitle}</h2>
            <img src={article.hero} alt={article.title} />
            <div dangerouslySetInnerHTML={{ __html: article.description }} />
            <p>Published on: {new Date(article.published).toLocaleDateString()}</p>
            <p>Author: {article.author.authorName}</p>
            <p>Category: {article.category.categoryName}</p>
            <p>Tags: {article.tags.join(', ')}</p>
        </div>
    );
};

export default ArticleDetails;