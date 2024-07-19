"use server";

import prisma from "@/lib/prisma";
import { RecipeType } from "@/types/recipe";
import { currentUser } from "@clerk/nextjs/server";

const createRecipe = async (formData: RecipeType) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to create a recipe.");
  }

  console.log(user.id);
  console.log(formData);

  //clear
};
export default createRecipe;
