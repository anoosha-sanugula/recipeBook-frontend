import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Bookmarks from "./Bookmarks";
import React from "react";

describe("Bookmarks Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders 'Hello favourites' if the user is authenticated", () => {
    localStorage.setItem("accessToken", "dummyToken");

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Bookmarks />
      </Router>
    );

    expect(screen.getByText("Hello favourites")).toBeInTheDocument();
  });

  test("renders 'Unauthenticated Page' if the user is not authenticated", async () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Bookmarks />
      </Router>
    );
    await waitFor(() => {
      expect(
        screen.getByText("Please log in or register to continue.")
      ).toBeInTheDocument();
    });
  });
});
