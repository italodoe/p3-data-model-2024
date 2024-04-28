import type { Prisma } from "@prisma/client";
import { db } from "./db";

export type UserOutput = Prisma.UserCreateInput;
export type UserOutputWithoutEmail = Omit<UserOutput, "emails">;

export const newUser = async (
  email: string,
  nick: string,
  fullName: string,
  admin: boolean,
  videos = null,
  comments = null
) => {
  return await db.user.create({
    data: {
      email,
      nick,
      fullName,
      admin,
    },
  });
};

export const findAllUsers = async (): Promise<UserOutput[]> => {
  return await db.user.findMany({
    include: {
        videos: true,
        comments: true
    }
  });
};
