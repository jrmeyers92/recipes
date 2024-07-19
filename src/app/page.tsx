import HomeHero from "@/components/HomeHero";
import { CreateRecipeForm } from "@/components/forms/CreateRecipeForm";
import { CreateRecipeFormOne } from "@/components/forms/CreateRecipeFormOne";

export default function Home() {
  return (
    <main className="flex  min-h-screen flex-col items-center justify-between">
      <HomeHero />
      {/* <CreateRecipeForm /> */}
      {/* <CreateRecipeFormOne /> */}
    </main>
  );
}
