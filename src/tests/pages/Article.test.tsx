import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Article from "../../pages/Article";
import * as api from "../../services/api";
import "@testing-library/jest-dom";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock API service
jest.mock("../../services/api");

describe("Article Page", () => {
  const mockGet = jest.spyOn(api, "get");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(
      <MemoryRouter initialEntries={["/article/1"]}>
        <Routes>
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading, please wait.../i)).toBeInTheDocument();
  });

  it("displays NoDataFound component if article is not found", async () => {
    mockGet.mockResolvedValueOnce({ data: null });

    render(
      <MemoryRouter initialEntries={["/article/1"]}>
        <Routes>
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockGet).toHaveBeenCalled());

    expect(
      screen.getByText(
        /Oops! The article you're looking for doesn't seem to exist/i
      )
    ).toBeInTheDocument();
  });
});
