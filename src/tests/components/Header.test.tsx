import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../../components/Header";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("renders the header with the correct title", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText("News Platform")).toBeInTheDocument();
  });

  it("renders the navigation link to Home", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const homeLink = screen.getByText("Home-Pagination");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute("href")).toBe("/");
  });

  it("renders the navigation link to Home- Fronted filtered", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const homeLink = screen.getByText("Home-Frontend Filter");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute("href")).toBe("/home-frontend-filter");
  });
});
