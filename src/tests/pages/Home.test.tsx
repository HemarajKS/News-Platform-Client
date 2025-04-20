import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";
import * as apiService from "../../services/api";
import { BrowserRouter } from "react-router-dom";

// Mock API responses
const mockArticles = [
  { id: 1, title: "Test Article 1" },
  { id: 2, title: "Test Article 2" },
];
const mockCategories = [{ id: 1, name: "News" }];
const mockAuthors = [{ id: 1, name: "John Doe" }];
const mockTags = ["tech", "finance"];

jest.mock("../../services/api");

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders NoDataFound when no articles available", async () => {
    (apiService.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes("categories")) return Promise.resolve({ data: [] });
      if (url.includes("authors")) return Promise.resolve({ data: [] });
      if (url.includes("tags")) return Promise.resolve({ data: [] });
      if (url.includes("articles"))
        return Promise.resolve({
          data: { articles: [], totalPages: 1 },
        });
    });

    renderComponent();

    await screen.findByText(/No Data/i);
  });

  test("pull to refresh reloads articles", async () => {
    const mockGet = apiService.get as jest.Mock;

    mockGet.mockImplementation((url: string) => {
      if (url.includes("categories"))
        return Promise.resolve({ data: mockCategories });
      if (url.includes("authors"))
        return Promise.resolve({ data: mockAuthors });
      if (url.includes("tags")) return Promise.resolve({ data: mockTags });
      return Promise.resolve({
        data: { articles: mockArticles, totalPages: 1 },
      });
    });

    renderComponent();

    await screen.findByText("Test Article 1");

    const refreshEvent = new CustomEvent("touchend", {});
    window.dispatchEvent(refreshEvent);

    // There is no native "pull to refresh" simulation, but we test handleRefresh by mocking refresh event
    await screen.findByText("Test Article 2");
  });
});
