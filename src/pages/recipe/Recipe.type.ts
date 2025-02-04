import { Ingredients } from "./Ingredients.type";

export type Recipe = {
  id: number;
  title: string;
  description?: string;
  instructions?: string;
  category: "Breakfast" | "Lunch" | "Dinner" | "Dessert";
  rating?: number;
  imageUrl?: string;
  videoUrl?: string;
  cookingTime?: number;
  nutritionFact?: string;
  Ingredients: Ingredients[];
};
