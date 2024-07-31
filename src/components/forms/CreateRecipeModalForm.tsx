"use client";

import createRecipe from "@/actions/_createRecipe";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";

const recipeSchema = z.object({
  name: z.string().min(1, "Please enter a recipe name."),
  description: z.string().min(1, "Please enter a description."),
  isPublic: z.boolean().optional(),
  image: z.any().optional(),
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

const CreateRecipeModalForm = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: false,
      steps: [{ step: "", order: 1 }],
      ingredients: [{ name: "", quantity: 1, unit: "" }],
      image: z.instanceof(File).refine((file) => file.size < 7000000, {
        message: "Your resume must be less than 7MB.",
      }),
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

    Object.entries(values).forEach(([key, value]) => {
      console.log(key);
      if (key === "image") {
        formData.append(key, value);
      } else if (key === "steps" || key === "ingredients") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const res = await createRecipe(formData);
      console.log("Recipe created successfully:", res);
      toast({
        title: "Success",
        description: "Your Recipe was created!",
      });
      form.reset();
      setIsSubmitted(false);
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast({
        title: "Failure",
        description:
          "There was an issue creating your recipe. Please try again",
      });
      setIsSubmitted(true);
    }
  };
  return (
    <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
      <DialogTrigger asChild>
        <Button variant="outline">Create a Recipe</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Create a Recipe</DialogTitle>
        </DialogHeader>
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
            {/* <FormField
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
            /> */}

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Availale for public to see</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Picture"
                      type="file"
                      accept="image/*, application/pdf"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              onClick={() =>
                appendStep({ step: "", order: stepFields.length + 1 })
              }
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
              onClick={() =>
                appendIngredient({ name: "", quantity: 1, unit: "" })
              }
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeModalForm;
