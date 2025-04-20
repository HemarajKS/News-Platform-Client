import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArticleFilter from "../../components/ArticleFilter";
import "@testing-library/jest-dom";

// Mock `useSearchParams`
const mockSetSearchParams = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [
    new URLSearchParams(),
    mockSetSearchParams, // Mock the setter function
  ],
}));

const mockCategories = [
  { _id: "1", categoryName: "Technology" },
  { _id: "2", categoryName: "Health" },
];

const mockAuthors = [
  { _id: "1", authorName: "John Doe" },
  { _id: "2", authorName: "Jane Smith" },
];

const mockTags = [
  { _id: "1", name: "React" },
  { _id: "2", name: "JavaScript" },
];

const renderWithRouter = (ui: React.ReactNode, route = "/") => {
  window.history.pushState({}, "Test page", route);
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe("ArticleFilter Component", () => {
  it("renders all filter options correctly", () => {
    renderWithRouter(
      <ArticleFilter
        categories={mockCategories}
        authors={mockAuthors}
        tags={mockTags}
      />
    );

    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Author")).toBeInTheDocument();
    expect(screen.getByLabelText("Article Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Tag")).toBeInTheDocument();
  });

  it("renders default values for filters", () => {
    renderWithRouter(
      <ArticleFilter
        categories={mockCategories}
        authors={mockAuthors}
        tags={mockTags}
      />
    );

    expect(screen.getByLabelText("Category")).toHaveValue("");
    expect(screen.getByLabelText("Author")).toHaveValue("");
    expect(screen.getByLabelText("Article Type")).toHaveValue("");
    expect(screen.getByLabelText("Tag")).toHaveValue("");
  });
});
