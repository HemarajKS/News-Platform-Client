import React from "react";
import { render, screen } from "@testing-library/react";
import NoDataFound from "../../components/NoDataFound";
import "@testing-library/jest-dom";

describe("NoDataFound Component", () => {
  it("renders with default message and suggestion", () => {
    render(<NoDataFound />);
    expect(screen.getByText("No data found!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try changing the filters to find what you're looking for."
      )
    ).toBeInTheDocument();
  });

  it("renders with custom message and suggestion", () => {
    const customMessage = "Custom no data message!";
    const customSuggestion = "Custom suggestion text.";
    render(
      <NoDataFound message={customMessage} suggestion={customSuggestion} />
    );
    expect(screen.getByText(customMessage)).toBeInTheDocument();
    expect(screen.getByText(customSuggestion)).toBeInTheDocument();
  });

  it("renders correctly when only message is provided", () => {
    const customMessage = "Only custom message!";
    render(<NoDataFound message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try changing the filters to find what you're looking for."
      )
    ).toBeInTheDocument();
  });

  it("renders correctly when only suggestion is provided", () => {
    const customSuggestion = "Only custom suggestion!";
    render(<NoDataFound suggestion={customSuggestion} />);
    expect(screen.getByText("No data found!")).toBeInTheDocument();
    expect(screen.getByText(customSuggestion)).toBeInTheDocument();
  });
});
