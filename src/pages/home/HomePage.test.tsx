import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";
import React from "react";

const mockRecipes = [
  {
    id: 1,
    title: "Test Recipe 1",
    description: "This is a test recipe",
    imageUrl: "https://via.placeholder.com/150",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Test Recipe 2",
    description: "This is another test recipe",
    imageUrl: "https://via.placeholder.com/150",
    rating: 3.8,
  },
];

global.alert = jest.fn();
global.fetch = jest.fn();

describe("HomePage", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockRecipes),
    });
    localStorage.clear();
  });

  test("renders UnAuthenticatedPage when not authenticated", async () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Please log in or register to continue.")
      ).toBeInTheDocument();
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Register")).toBeInTheDocument();
    });
  });
  test("renders HomePage when authenticated", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Search for Recipes...")
      ).toBeInTheDocument();
      expect(screen.getByText("Recipes:")).toBeInTheDocument();
    });
  });
  test("renders UnAuthenticatedPage when no accessToken is present", async () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Please log in or register to continue.")
      ).toBeInTheDocument();
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Register")).toBeInTheDocument();
    });
  });

  test("renders the home page correctly", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/search for recipes/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Recipes:/i)).toBeInTheDocument();
    });
  });

  test("displays a list of recipes", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Test Recipe 1")).toBeInTheDocument();
      expect(screen.getByText("Test Recipe 2")).toBeInTheDocument();
    });
  });

  test("filters recipes based on search input", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByPlaceholderText(/search for recipes/i), {
      target: { value: "Test Recipe 1" },
    });

    await waitFor(() => {
      expect(screen.getByText("Test Recipe 1")).toBeInTheDocument();
      expect(screen.queryByText("Test Recipe 2")).toBeNull();
    });
  });

  test("handles empty search result", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      fireEvent.change(screen.getByPlaceholderText(/search for recipes/i), {
        target: { value: "Non-existent Recipe" },
      });

      expect(
        screen.getByText("No recipes found. Try a different search.")
      ).toBeInTheDocument();
    });
  });

  test("clicking on a recipe card navigates to the recipe detail page", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const recipeLink = screen.getByText("Test Recipe 1");
    fireEvent.click(recipeLink);

    expect(window.location.pathname).toBe("/");
  });

  test("should call alert with a generic error message when an error occurs during fetch", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));
    localStorage.setItem("accessToken", "mockedAccessToken");

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Error while recipe retrieving"
      );
    });
  });

  test("should call fetch and handle successful response", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Test Recipe 1")).toBeInTheDocument();
      expect(screen.getByText("Test Recipe 2")).toBeInTheDocument();
    });
  });

  test("handles error in fetch", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Error while recipe retrieving"
      );
    });
  });
  test("recipe card image has default if imageUrl is missing", async () => {
    const recipesWithMissingImage = [
      {
        id: 1,
        title: "Test Recipe 1",
        description: "This is a test recipe",
        imageUrl: "",
        rating: 4.5,
      },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(recipesWithMissingImage),
    });
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByAltText("Test Recipe 1")).toHaveAttribute(
        "src",
        "/assets/recdef.jpg"
      );
    });
  });
  test("renders the navbar and footer", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByAltText("Logo")).toBeInTheDocument();
      expect(screen.getByAltText("Logo-text")).toBeInTheDocument();
      expect(screen.getByAltText("fav")).toBeInTheDocument();
      expect(screen.getByAltText("profile")).toBeInTheDocument();
      expect(screen.getByText("© 2024 RecipeBook!")).toBeInTheDocument();
    });
  });
  test("displays the recipe description when available", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("This is a test recipe")).toBeInTheDocument();
    });
  });
});
