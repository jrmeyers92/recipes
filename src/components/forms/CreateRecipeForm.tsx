"use client";

import createRecipe from "@/actions/_createRecipe";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { RecipeType } from "@/types/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Card, CardHeader } from "../ui/card";

const formSchema = z.object({
  name: z.string().min(1, "Please enter a recipe name."),
  description: z.string().min(1, "Please enter a description."),
  isPublic: z.boolean(),
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

export function CreateRecipeForm() {
  const form = useForm<RecipeType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
      image: "",
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

  const onSubmit = (data: RecipeType) => {
    createRecipe(data);

    // clear form
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border-b-2">
        <div className="grid grid-cols-2 items-center justify-center gap-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Recipe Name"
            placeholder="Mom's Lasagna"
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="Ispublic"
            label="Public"
          />
        </div>
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="description"
          label="Description"
          placeholder="A delicious lasagna recipe."
        />

        <h3 className="text-lg my-2">Ingredients</h3>

        {ingredientFields.map((field, index) => (
          <Card key={field.id} className="p-2 my-2">
            <CardHeader className="p-0">
              <Button
                type="button"
                onClick={() => removeIngredient(index)}
                size="icon"
                variant="destructive"
                className="ml-auto w-auto h-auto p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <div className="flex gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name={`ingredients.${index}.name`}
                label="Ingredient Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name={`ingredients.${index}.quantity`}
                label="Quantity"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name={`ingredients.${index}.unit`}
                label="Unit"
              />
            </div>
          </Card>
        ))}
        <Button
          type="button"
          onClick={() => appendIngredient({ name: "", quantity: 1, unit: "" })}
          className="my-2"
        >
          Add Ingredient
        </Button>

        <h3 className="text-lg my-2">Steps</h3>
        {stepFields.map((field, index) => (
          <Card key={field.id} className="p-2 my-2">
            <CardHeader className="p-0">
              <Button
                type="button"
                onClick={() => removeStep(index)}
                size="icon"
                variant="destructive"
                className="ml-auto w-auto h-auto p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name={`steps.${index}.step`}
              label="Step"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name={`steps.${index}.order`}
              label="Order"
            />
          </Card>
        ))}

        <Button
          type="button"
          onClick={() => appendStep({ step: "", order: stepFields.length + 1 })}
          className="my-2"
        >
          Add Step
        </Button>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
