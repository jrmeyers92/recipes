"use client";

import createRecipe from "@/actions/_createRecipe";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";

const recipeSchema = z.object({
  name: z.string().min(1, "Please enter a recipe name."),
  description: z.string().min(1, "Please enter a description."),
  isPublic: z.boolean().optional(),
  steps: z.array(
    z.object({
      step: z.string(),
      order: z.number().min(1),
    })
  ),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().min(0.01),
      unit: z.string(),
    })
  ),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

export function CreateRecipeFormOne() {
  const { toast } = useToast();
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
      steps: [{ step: "", order: 1 }],
      ingredients: [{ name: "", quantity: 1, unit: "" }],
    },
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  type RecipeFormValues = z.infer<typeof recipeSchema>;

  const onSubmit = async (values: RecipeFormValues) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("isPublic", String(values.isPublic));
    formData.append("steps", JSON.stringify(values.steps));
    formData.append("ingredients", JSON.stringify(values.ingredients));

    try {
      const res = await createRecipe(formData);
      console.log("Recipe created successfully:", res);
      toast({
        title: "Success",
        description: "Your Recipe was created!",
      });
      form.reset();
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast({
        title: "Failure",
        description:
          "There was an issue creating your recipe. Please try again",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <FormLabel>Public</FormLabel>
              <FormControl>
                <Checkbox {...field} value={field.value.toString()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <h3>Steps</h3>
        {stepFields.map((field, index) => (
          <div key={field.id} className="relative p-2 border-b-2 py-4">
            <Button
              variant="destructive"
              type="button"
              onClick={() => removeStep(index)}
              className="ml-auto px-2 py-1 absolute right-0 top-0"
            >
              <X />
            </Button>
            <FormField
              control={form.control}
              name={`steps.${index}.step`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step {index + 1}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendStep({ step: "", order: stepFields.length + 1 })}
          variant="secondary"
        >
          <Plus className="mr-2" />
          Add Step
        </Button>
        <h3>Ingredients</h3>
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="relative p-2 border-b-2 py-4">
            <Button
              variant="destructive"
              type="button"
              onClick={() => removeIngredient(index)}
              className="ml-auto px-2 py-1 absolute right-0 top-0"
            >
              <X />
            </Button>
            <FormField
              control={form.control}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Ingredient Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`ingredients.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`ingredients.${index}.unit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendIngredient({ name: "", quantity: 1, unit: "" })}
          variant="secondary"
        >
          <Plus className="mr-2" />
          Add Ingredient
        </Button>
        <Button className="block w-full" type="submit">
          Create Recipe
        </Button>
      </form>
    </Form>
  );
}
