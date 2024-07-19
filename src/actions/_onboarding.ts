"use server";

import db from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const onboard = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found." };
  }

  try {
    await db.user.create({
      data: {
        // Set the properties of the new user here
        clerkId: userId,
        email: formData.get("email")?.toString() || "",
        firstName: formData.get("firstName")?.toString() || "",
        lastName: formData.get("lastName")?.toString() || "",
        birthYear:
          parseInt(formData.get("birthYear")?.toString() ?? "") || null,
        birthMonth: formData.get("birthMonth")?.toString() || "",
        birthDay: parseInt(formData.get("birthDay")?.toString() ?? "") || null,
        gender: formData.get("gender")?.toString() || "",
        city: formData.get("city")?.toString() || "",
        state: formData.get("state")?.toString() || "",
        zipCode: Number(formData.get("zipCode")),
      },
    });
  } catch (err) {
    console.error(err);
    return { error: "There was an error creating the user." };
  }

  try {
    const res = await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        applicationName: formData.get("applicationName"),
        applicationType: formData.get("applicationType"),
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    console.error(err);
    return { error: "There was an error updating the user metadata." };
  }
};
