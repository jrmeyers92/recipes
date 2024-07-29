"use server";

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const createRecipe = async (formData: any) => {
  console.log(formData);
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to create a recipe.");
  }

  let prismaUser;
  try {
    prismaUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
  } catch {
    throw new Error("Failed to find user");
  }

  try {
    if (!prismaUser?.id) {
      throw new Error("User not found in database.");
    }

    let ingredients = JSON.parse(formData.get("ingredients"));
    let steps = JSON.parse(formData.get("steps"));
    let ingredientsArray = ingredients.map((ingredient: any) => {
      return {
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      };
    });

    let stepsArray = steps.map((step: any, index: number) => {
      return {
        step: step.step,
        order: index + 1,
      };
    });

    const recipe = await db.recipe.create({
      data: {
        name: formData.get("name"),
        description: formData.get("description") || "",
        isPublic: formData.get("isPublic") === "true",
        authorId: prismaUser.id,
        ingredients: {
          create: ingredientsArray,
        },
        steps: {
          create: stepsArray,
        },
      },
    });

    return recipe;
  } catch (error) {
    console.error("Failed to create recipe", error);
    throw new Error("Failed to create recipe");
  }
};

export default createRecipe;
