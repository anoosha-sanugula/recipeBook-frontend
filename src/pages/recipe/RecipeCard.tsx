import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Recipe } from "./Recipe.type";
import "./RecipeCard.css";
const RecipeCard = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const extractVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|\S+\?v=)|youtu\.be\/)([\w-]+)(?:[?&]t=[\d\w-]+)?/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  let embedUrl;
  if (recipe?.videoUrl) {
    const videoId = extractVideoId(recipe.videoUrl);
    embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  }
  useEffect(() => {
    const fetchRecipe = async () => {
      const url = `http://localhost:3000/recipebook/recipes/${recipeId}`;
      try {
        const response = await fetch(url, { method: "GET" });
        if (response.ok) {
          const recipeData = await response.json();
          setRecipe(recipeData);
        }
      } catch (error) {
        alert("Error fetching recipe");
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-page">
      <img
        src={recipe.imageUrl || "/assets/recdef.jpg"}
        alt={recipe.title}
        className="recipe-img"
      />
      <div className="recipe-details">
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <div className="recipe-rating">
          <p>Rating: {recipe.rating}</p>
          <img src="/assets/rating.png" alt="rating" className="rating-image" />
        </div>
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
        <h3>Ingredients</h3>
        <div className="ingredient-list">
          {recipe.Ingredients && recipe.Ingredients.length > 0 ? (
            recipe.Ingredients.map((ingredient, index) => (
              <div className="ingredient-item" key={index}>
                {ingredient.imageUrl && (
                  <img
                    src={ingredient.imageUrl}
                    alt={ingredient.name}
                    className="ingredient-image"
                  />
                )}
                <div className="ingredient-info">
                  <span className="ingredient-quantity">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  <span className="ingredient-name">{ingredient.name}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No ingredients listed.</p>
          )}
        </div>
        <div>
          {embedUrl ? (
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No video available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
