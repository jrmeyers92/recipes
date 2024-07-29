import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Nav = () => {
  const customButtonClass = buttonVariants(); // This should return a string like "your-org-button org-red-button"

  return (
    <nav className="flex items-center justify-between p-4">
      <h1 className="text-3xl font-bold">
        <Link href="/">Recipezz</Link>
      </h1>
      <ul className="flex items-center gap-4 font-bold">
        <SignedIn>
          <Link href="/my-recipes">My Recipes</Link>
          <Link href="/browse">Browse Recipes</Link>

          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-4">
            <Link href="/sign-up" className={buttonVariants()}>
              Sign Up
            </Link>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "outline" })}
            >
              Sign In
            </Link>
          </div>
        </SignedOut>
      </ul>
    </nav>
  );
};

export default Nav;
