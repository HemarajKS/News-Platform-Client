const API_LINKS = {
  ARTICLES: {
    GET_ALL: "/articles",
    GET_EACH: (id: string) => `/articles/${id}`,
  },
  CATEGORIES: {
    GET_ALL: "/categories",
  },

  AUTHORS: {
    GET_ALL: "/authors",
  },
};

export default API_LINKS;
