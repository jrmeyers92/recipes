"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
const getUserByClerkId = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("No user found");
  }

  const theUser = prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return theUser.id;
};

export default getUserByClerkId;
