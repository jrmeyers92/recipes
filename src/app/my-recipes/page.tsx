import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const MyRecipes = async () => {
  const recipes = await getRecipes();

  if (recipes.length === 0) {
    return <div className="container">You have no recipes</div>;
  }

  return (
    <div className="container">
      <h1 className="text-3xl text-center py-4">My Recipes</h1>
      <ul className="flex gap-4">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Card>
              <CardHeader>
                <CardTitle>{recipe.name}</CardTitle>
                <p>{recipe.description}</p>
              </CardHeader>
              <CardContent>
                <div className="py-2">
                  <h3 className="font-bold">Ingredients</h3>
                  <ul>
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.name}>
                        {ingredient.quantity} {ingredient.unit}{" "}
                        {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="py-2">
                  <h3 className="font-bold">Steps</h3>
                  <ol>
                    {recipe.steps.map((step) => (
                      <li key={step.order}>{step.step}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;

const getRecipes = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const recipes = await db.recipe.findMany({
    where: {
      author: {
        clerkId: user.id,
      },
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });

  return recipes;
};
