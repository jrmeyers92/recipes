import OnboardingForm from "@/components/forms/OnboardingForm";
import { currentUser } from "@clerk/nextjs/server";

// import OnboardingForm from "./components/OnboardingForm";

export default async function OnboardingComponent({}) {
  const user = await currentUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="my-6 text-center text-3xl">Hi, {user?.firstName}!</h1>

      <OnboardingForm />
    </div>
  );
}
