import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
const HomeHero = () => {
  return (
    <div className="max-h-[700px] overflow-hidden ">
      <Image
        src="/home-hero.jpg"
        alt="Hero image of food"
        className="brightness-50"
        width={2500}
        height={1560}
      />
      <div className="text-white z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -my-12">
        <h1 className="text-7xl">Welcome to Recipezz</h1>
        <h2 className="text-3xl">
          Where your family recipes won't be forgotten
        </h2>
        <div className="w-full text-center mt-4">
          <SignedOut>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants(),
                "bg-yellow-500 hover:bg-yellow-600 text-black text-lg"
              )}
            >
              SIGN UP
            </Link>
          </SignedOut>
          <SignedIn>
            <Button>Create Recipe</Button>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
