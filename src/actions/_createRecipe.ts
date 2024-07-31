"use server";

import { uploadImage } from "@/lib/cloudinary";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const createRecipe = async (formData: FormData) => {
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

  if (!prismaUser) {
    throw new Error("User not found in database.");
  }

  console.log(prismaUser);

  let imageUrl;

  try {
    const imageFile = formData.get("image") as File;
    if (!imageFile) {
      throw new Error("Image file is missing");
    }
    imageUrl = await uploadImage(imageFile);
  } catch (err) {
    throw new Error("Failed to upload image");
  }

  try {
    const ingredients = JSON.parse(formData.get("ingredients") as string);
    const steps = JSON.parse(formData.get("steps") as string);
    const ingredientsArray = ingredients.map((ingredient: any) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    }));

    const stepsArray = steps.map((step: any, index: number) => ({
      step: step.step,
      order: index + 1,
    }));

    console.log(ingredientsArray);
    console.log(stepsArray);

    const recipe = await db.recipe.create({
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        isPublic: formData.get("isPublic") === "true",
        image: imageUrl,
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
