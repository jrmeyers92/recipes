"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";

// Define Zod schema based on the Prisma schema
const recipeSchema = z.object({
  name: z.string().min(1, "Please enter a recipe name."),
  description: z.string().min(1, "Please enter a description."),
  public: z.boolean(),
  image: z.string().optional(),
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

export function CreateRecipeFormOne() {
  const form = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
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

  const onSubmit = (data) => {
    console.log(data);
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
          name="public"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public</FormLabel>
              <FormControl>
                <Checkbox {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
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
        />
        <h3>Steps</h3>
        {stepFields.map((field, index) => (
          <div key={field.id}>
            <FormField
              control={form.control}
              name={`steps.${index}.step`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step {index + 1}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <Button type="button" onClick={() => removeStep(index)}>
                    Remove Step
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendStep({ step: "", order: stepFields.length + 1 })}
        >
          Add Step
        </Button>
        <h3>Ingredients</h3>
        {ingredientFields.map((field, index) => (
          <div key={field.id}>
            <FormField
              control={form.control}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem>
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
                  <Button type="button" onClick={() => removeIngredient(index)}>
                    Remove Ingredient
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() => appendIngredient({ name: "", quantity: 1, unit: "" })}
        >
          Add Ingredient
        </Button>
        <Button type="submit">Submit Recipe</Button>
      </form>
    </Form>
  );
}
