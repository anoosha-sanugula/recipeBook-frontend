import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import { Recipe } from "../recipe/Recipe.type";
import UnAuthenticatedPage from "../unauthenticated/UnAuthenticatedPage";

function HomePage() {
  const [searchRecipe, setSearchRecipe] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
      fetchRecipes();
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  const handleSearchRecipe = (event: any) => {
    setSearchRecipe(event.target.value);
  };
  const fetchRecipes = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/recipes`;
    const token = localStorage.getItem("accessToken");

    const headers: HeadersInit = token
      ? { Authorization: `Bearer ${token}` }
      : {};
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const recipeData = await response.json();
        setRecipes(recipeData);
      }
    } catch (error: any) {
      alert("Error while recipe retrieving");
    }
  };
  const filteredRecipes = searchRecipe
    ? recipes.filter((recipe: Recipe) =>
        recipe.title.toLowerCase().includes(searchRecipe.toLowerCase())
      )
    : recipes;

  return (
    <div>
      {isAuthenticated ? (
        <div className="home-page">
          <div className="background-image"></div>
          <div className="navbar">
            <div className="navbar-left">
              <img src="/assets/logo1.png" alt="Logo" className="logo" />
              <img
                src="/assets/logo-text.png"
                alt="Logo-text"
                className="logo-text"
              />
            </div>
            <div className="navbar-right">
              <Link to="/bookmarks">
                <img src="/assets/fav.png" alt="fav" className="fav-logo" />
              </Link>
              <Link to="/profile">
                <img
                  src="/assets/user.png"
                  alt="profile"
                  className="profile-logo"
                />
              </Link>
            </div>
          </div>

          <div className="search-container">
            <div className="search-bar-wrapper">
              <input
                type="text"
                placeholder={searchRecipe === "" ? "Search for Recipes..." : ""}
                value={searchRecipe}
                onChange={handleSearchRecipe}
                className="search-bar"
              />
            </div>
          </div>

          <div className="content">
            <div className="search-results">
              <h2>Recipes:</h2>
              <div className="recipe-cards">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(
                    (recipe: Recipe, indexOfRecipe: number) => (
                      <div key={indexOfRecipe} className="recipe-card">
                        <Link to={`/recipe/${recipe.id}`}>
                          <img
                            src={recipe.imageUrl || "/assets/recdef.jpg"}
                            alt={recipe.title}
                            className="recipe-image"
                          />
                          <div className="recipe-details">
                            <h3>{recipe.title}</h3>
                            <p>
                              {recipe.description ||
                                "No description available."}
                            </p>
                            {recipe.rating && (
                              <div className="recipe-rating">
                                <p>Rating: {recipe.rating}</p>
                                <img
                                  src="/assets/rating.png"
                                  alt="rating"
                                  className="rating-image"
                                />
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>
                    )
                  )
                ) : (
                  <div className="no-results">
                    <span role="img" aria-label="No results">
                      🥄
                    </span>
                    <p>No recipes found. Try a different search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <footer className="footer">
            <p>&copy; 2024 RecipeBook!</p>
          </footer>
        </div>
      ) : (
        <UnAuthenticatedPage />
      )}
    </div>
  );
}

export default HomePage;
