export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type Step = {
  step: string;
  order: number;
};

// export type RecipeType = {
//   name: string;
//   description: string;
//   isPublic: boolean;
//   image: string;
//   ingredients: Ingredient[];
//   steps: Step[];
// };
