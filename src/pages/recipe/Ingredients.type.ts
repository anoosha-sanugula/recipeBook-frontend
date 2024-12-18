export type Ingredients = {
  name: string;
  quantity: number;
  imageUrl?: string;
  unit: [
    | "grams"
    | "kilograms"
    | "milliliters"
    | "liters"
    | "cups"
    | "tablespoons"
    | "teaspoons"
    | "pinch"
    | "units"
  ];
};
