import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface ArticleFilterProps {
  categories: { _id: string; categoryName: string }[];
  authors: { _id: string; authorName: string }[];
  tags: { _id: string; name: string }[];
}

const ArticleFilter: React.FC<ArticleFilterProps> = ({
  categories,
  authors,
  tags,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = React.useState<
    string | undefined
  >(searchParams.get("categoryId") || undefined);
  const [selectedAuthor, setSelectedAuthor] = React.useState<
    string | undefined
  >(searchParams.get("authorId") || undefined);
  const [selectedArticleType, setSelectedArticleType] = React.useState<
    string | undefined
  >(searchParams.get("articleType") || undefined);
  const [selectedTag, setSelectedTag] = React.useState<string | undefined>(
    searchParams.get("tag") || undefined
  );

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Update query params when filters change
  const updateFilters = () => {
    const params: Record<string, string> = {};
    if (selectedCategory) params.categoryId = selectedCategory;
    if (selectedAuthor) params.authorId = selectedAuthor;
    if (selectedArticleType) params.articleType = selectedArticleType;
    if (selectedTag) params.tag = selectedTag;

    setSearchParams(params);
  };

  useEffect(() => {
    updateFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedAuthor, selectedArticleType, selectedTag]);

  return (
    <>
      {/* Button to open bottom sheet on mobile */}
      <button
        className=" bg-blue-500 text-white p-3 rounded-full shadow-lg md:hidden"
        onClick={() => setIsBottomSheetOpen(true)}
      >
        Filters
      </button>

      {/* Bottom Sheet */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end md:hidden">
          <div className="bg-white w-full rounded-t-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Filters</h2>
              <button
                className="text-gray-500"
                onClick={() => setIsBottomSheetOpen(false)}
              >
                Close
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={selectedCategory || ""}
                onChange={(e) =>
                  setSelectedCategory(e.target.value || undefined)
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <select
                id="author"
                value={selectedAuthor || ""}
                onChange={(e) => setSelectedAuthor(e.target.value || undefined)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Authors</option>
                {authors.map((author) => (
                  <option key={author._id} value={author._id}>
                    {author.authorName}
                  </option>
                ))}
              </select>
            </div>

            {/* Article Type Filter */}
            <div>
              <label
                htmlFor="articleType"
                className="block text-sm font-medium text-gray-700"
              >
                Article Type
              </label>
              <select
                id="articleType"
                value={selectedArticleType || ""}
                onChange={(e) =>
                  setSelectedArticleType(e.target.value || undefined)
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="TEXT">Text</option>
                <option value="VIDEO">Video</option>
                <option value="AUDIO">Audio</option>
              </select>
            </div>

            {/* Tag Filter */}
            <div>
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-700"
              >
                Tag
              </label>
              <select
                id="tag"
                value={selectedTag || ""}
                onChange={(e) => setSelectedTag(e.target.value || undefined)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden md:flex p-4 bg-white shadow-md rounded-lg space-y-4 md:space-y-0 md:space-x-4 md:items-center">
        {/* Category Filter */}
        <div className="flex-1">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value || undefined)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Author Filter */}
        <div className="flex-1">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <select
            id="author"
            value={selectedAuthor || ""}
            onChange={(e) => setSelectedAuthor(e.target.value || undefined)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.authorName}
              </option>
            ))}
          </select>
        </div>

        {/* Article Type Filter */}
        <div className="flex-1">
          <label
            htmlFor="articleType"
            className="block text-sm font-medium text-gray-700"
          >
            Article Type
          </label>
          <select
            id="articleType"
            value={selectedArticleType || ""}
            onChange={(e) =>
              setSelectedArticleType(e.target.value || undefined)
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Types</option>
            <option value="TEXT">Text</option>
            <option value="VIDEO">Video</option>
            <option value="AUDIO">Audio</option>
          </select>
        </div>

        {/* Tag Filter */}
        <div className="flex-1">
          <label
            htmlFor="tag"
            className="block text-sm font-medium text-gray-700"
          >
            Tag
          </label>
          <select
            id="tag"
            value={selectedTag || ""}
            onChange={(e) => setSelectedTag(e.target.value || undefined)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag._id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default ArticleFilter;
