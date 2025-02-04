import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import RecipeCard from "./RecipeCard";

global.alert = jest.fn();
global.fetch = jest.fn();

const mockRecipe = {
  id: 1,
  title: "Tomato",
  imageUrl: "https://via.placeholder.com/150",
  rating: 4.5,
  description:
    "A rich and fragrant Middle Eastern dessert made with vermicelli, ghee, and a sugar syrup, often flavored with rose water and garnished with nuts.",
  instructions:
    "Cook the vermicelli in ghee until golden, then add sugar syrup and simmer to soak up the flavors. Garnish with nuts and rose water for added fragrance.",
  category: "Dessert",
  videoUrl: "https://www.youtube.com/watch?v=dc8A9T0w050",
  cookingTime: 30,
  nutritionFact: "Calories: 250 per serving",
  Ingredients: [
    {
      name: "Ghee",
      quantity: 3,
      unit: "tablespoons",
      imageUrl:
        "https://vamshifarms.com/cdn/shop/files/gheefalling_2048x.jpg?v=1717574447",
    },
    {
      name: "Sugar",
      quantity: 150,
      unit: "grams",
      imageUrl:
        "https://www.tasteofhome.com/wp-content/uploads/2019/11/sugar-shutterstock_615908132.jpg",
    },
  ],
};

describe("RecipeCard Component", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockRecipe),
    });
    localStorage.clear();
  });
  test("renders UnAuthenticatedPage when not authenticated", async () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RecipeCard />
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

  test("renders recipe image, title, and description correctly when authenticated", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RecipeCard />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByAltText("Tomato")).toBeInTheDocument();
      expect(screen.getByText("Tomato")).toBeInTheDocument();
      expect(screen.getByText(mockRecipe.description)).toBeInTheDocument();
    });
  });

  test("renders rating correctly", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RecipeCard />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText(`Rating: ${mockRecipe.rating}`)
      ).toBeInTheDocument();
      expect(screen.getByAltText("rating")).toBeInTheDocument();
    });
  });

  test("renders ingredients correctly", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RecipeCard />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText(mockRecipe.Ingredients[0].name)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `${mockRecipe.Ingredients[0].quantity} ${mockRecipe.Ingredients[0].unit}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(mockRecipe.Ingredients[0].name)
      ).toHaveAttribute("src", mockRecipe.Ingredients[0].imageUrl);

      expect(
        screen.getByText(mockRecipe.Ingredients[1].name)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `${mockRecipe.Ingredients[1].quantity} ${mockRecipe.Ingredients[1].unit}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(mockRecipe.Ingredients[1].name)
      ).toHaveAttribute("src", mockRecipe.Ingredients[1].imageUrl);
    });
  });
  test("handles error in fetch", async () => {
    localStorage.setItem("accessToken", "mockedAccessToken");
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RecipeCard />
      </Router>
    );

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Error fetching recipe");
    });
  });
});
