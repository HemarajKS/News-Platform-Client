const API_LINKS = {
  ARTICLES: {
    GET_ALL: "/articles",
    GET_FILTERED: "/articles/filter",
    GET_EACH: (id: string) => `/articles/${id}`,
  },
  CATEGORIES: {
    GET_ALL: "/categories",
  },

  AUTHORS: {
    GET_ALL: "/authors",
  },

  TAGS: {
    GET_ALL: "/tags",
  },
};

export default API_LINKS;
