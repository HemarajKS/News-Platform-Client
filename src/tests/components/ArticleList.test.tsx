import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ArticleList from "../../components/ArticleList";
import "@testing-library/jest-dom";

describe("ArticleList Component", () => {
  const mockArticles = [
    {
      articleId: "1",
      title: "Test Article 1",
      subtitle: "Subtitle of Test Article 1",
      hero: "https://example.com/image1.jpg",
      categoryId: "cat1",
      authorId: "author1",
      articleType: "type1",
      tags: ["tag1", "tag2"],
      content: "This is the content of Test Article 1",
    },
    {
      articleId: "2",
      title: "Test Article 2",
      subtitle: "Subtitle of Test Article 2",
      hero: "invalid-url",
      categoryId: "cat2",
      authorId: "author2",
      articleType: "type2",
      tags: ["tag3", "tag4"],
      content: "This is the content of Test Article 2",
    },
  ];

  it("renders a list of articles", () => {
    render(
      <Router>
        <ArticleList articles={mockArticles} />
      </Router>
    );

    // Check if article titles and subtitles are rendered
    expect(screen.getByText("Test Article 1")).toBeInTheDocument();
    expect(screen.getByText("Subtitle of Test Article 1")).toBeInTheDocument();
    expect(screen.getByText("Test Article 2")).toBeInTheDocument();
    expect(screen.getByText("Subtitle of Test Article 2")).toBeInTheDocument();
  });

  it("renders fallback image when hero image fails to load", () => {
    render(
      <Router>
        <ArticleList articles={mockArticles} />
      </Router>
    );

    // Simulate image load error for the second article
    const images = screen.getAllByRole("img");
    fireEvent.error(images[1]);

    // Check if fallback image is used
    expect(images[1]).toHaveAttribute(
      "src",
      "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
    );
  });

  it("links to the correct article page", () => {
    render(
      <Router>
        <ArticleList articles={mockArticles} />
      </Router>
    );

    // Check if links point to the correct article pages
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/article/1");
    expect(links[1]).toHaveAttribute("href", "/article/2");
  });

  it("renders article images with correct alt text", () => {
    render(
      <Router>
        <ArticleList articles={mockArticles} />
      </Router>
    );

    // Check if images have the correct alt text
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("alt", "Test Article 1");
    expect(images[1]).toHaveAttribute("alt", "Test Article 2");
  });
});
