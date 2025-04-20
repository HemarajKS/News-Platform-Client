import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ArticleDetails from "../../components/ArticleDetails";
import "@testing-library/jest-dom";

// Mock Article Data
interface Article {
  title: string;
  subtitle: string;
  hero: string;
  description: string;
  mediaUrl: string;
  articleType: "AUDIO" | "VIDEO" | "TEXT";
  published: string;
  author: {
    _id: string;
    authorName: string;
    authorImage: string;
    description: string;
  };
  category: {
    _id: string;
    categoryName: string;
  };
  tags: string[];
}

const mockArticle: Article = {
  title: "Test Article",
  subtitle: "This is a subtitle",
  hero: "https://via.placeholder.com/800x400",
  description: "<p>This is a test article description.</p>",
  mediaUrl: "audio.mp3",
  articleType: "AUDIO",
  published: "2025-04-20T12:00:00Z",
  author: {
    _id: "1",
    authorName: "Jane Doe",
    authorImage: "https://via.placeholder.com/150",
    description: "Tech writer & blogger",
  },
  category: {
    _id: "1",
    categoryName: "Technology",
  },
  tags: ["React", "JavaScript"],
};

it("renders the author description in the tooltip", async () => {
  render(
    <BrowserRouter>
      <ArticleDetails article={mockArticle} />
    </BrowserRouter>
  );

  // Hover over the author name
  const authorNameElement = screen.getByTestId("author-name");
  fireEvent.mouseOver(authorNameElement); // simulate hover

  // Check if the tooltip with the author description is rendered
  const authorTooltip = await screen.findByTestId("author-tooltip");
  expect(authorTooltip).toBeInTheDocument();
  expect(authorTooltip).toHaveTextContent(mockArticle.author.description);
});

it("renders fallback image for author image on error", () => {
  render(
    <BrowserRouter>
      <ArticleDetails article={mockArticle} />
    </BrowserRouter>
  );
  const authorImage = screen.getByAltText(mockArticle.author.authorName);
  fireEvent.error(authorImage);
  expect(authorImage).toHaveAttribute(
    "src",
    "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
  );
});

it("renders all tags and navigates on tag click", () => {
  render(
    <BrowserRouter>
      <ArticleDetails article={mockArticle} />
    </BrowserRouter>
  );
  mockArticle.tags.forEach((tag) => {
    const tagElement = screen.getByText(tag);
    expect(tagElement).toBeInTheDocument();
    fireEvent.click(tagElement);
    expect(window.location.href).toContain(`/?tag=${tag}`);
  });
});

it("renders fallback image for hero image on error", () => {
  render(
    <BrowserRouter>
      <ArticleDetails article={mockArticle} />
    </BrowserRouter>
  );
  const heroImage = screen.getByAltText(mockArticle.title);
  fireEvent.error(heroImage);
  expect(heroImage).toHaveAttribute(
    "src",
    "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
  );
});

it("renders the category name and navigates on click", () => {
  render(
    <BrowserRouter>
      <ArticleDetails article={mockArticle} />
    </BrowserRouter>
  );
  const categoryElement = screen.getByText(mockArticle.category.categoryName);
  expect(categoryElement).toBeInTheDocument();
  fireEvent.click(categoryElement);
  expect(window.location.href).toContain(
    `/?categoryId=${mockArticle.category._id}`
  );
});
