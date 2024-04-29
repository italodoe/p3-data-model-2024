import type { Prisma } from "@prisma/client";
import { db } from "./db";

export type UserOutput = Prisma.UserCreateInput;
export type UserOutputWithoutEmail = Omit<UserOutput, "emails">;

/*
  Create
*/

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



/*
  Find
*/

export const findAllUsers = async (): Promise<UserOutput[]> => {
  return await db.user.findMany({
    include: {
      videos: true,
      comments: true,
    },
  });
};

export const findUserById = async (
  userId: number
): Promise<UserOutput | null> => {
  return await db.user.findFirst({
    where: { userId },
  });
};

export const findUserByNick = async (
  nick: string
): Promise<UserOutput | null> => {
  return await db.user.findFirst({
    where: { nick },
  });
};

export const findUserByEmail = async (
  email: string
): Promise<UserOutput | null> => {
  return await db.user.findFirst({
    where: { email },
  });
};
