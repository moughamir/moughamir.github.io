import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";

test("renders page component", () => {
  render(<Page params={Promise.resolve({ id: "test-id" })} />);
  const linkElement = screen.getByText(/page content/i);
  expect(linkElement).toBeInTheDocument();
});
