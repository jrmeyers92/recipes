"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
const getUserByClerkId = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("No user found");
  }

  const theUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  if (!theUser) {
    throw new Error("No user found in the database");
  }
  return theUser.id;
};

export default getUserByClerkId;
