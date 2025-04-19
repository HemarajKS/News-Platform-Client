import React from 'react';

interface ArticleFilterProps {
    categories: { categoryId: string; categoryName: string }[];
    onFilterChange: (filter: { categoryId?: string; authorId?: string; tag?: string }) => void;
}

const ArticleFilter: React.FC<ArticleFilterProps> = ({ categories, onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>(undefined);
    const [selectedAuthor, setSelectedAuthor] = React.useState<string | undefined>(undefined);
    const [selectedTag, setSelectedTag] = React.useState<string | undefined>(undefined);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        onFilterChange({ categoryId });
    };

    const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const authorId = event.target.value;
        setSelectedAuthor(authorId);
        onFilterChange({ authorId });
    };

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tag = event.target.value;
        setSelectedTag(tag);
        onFilterChange({ tag });
    };

    return (
        <div>
            <h2>Filter Articles</h2>
            <div>
                <label htmlFor="category">Category:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <select id="author" value={selectedAuthor} onChange={handleAuthorChange}>
                    <option value="">All Authors</option>
                    {/* Add author options here */}
                </select>
            </div>
            <div>
                <label htmlFor="tag">Tag:</label>
                <select id="tag" value={selectedTag} onChange={handleTagChange}>
                    <option value="">All Tags</option>
                    {/* Add tag options here */}
                </select>
            </div>
        </div>
    );
};

export default ArticleFilter;