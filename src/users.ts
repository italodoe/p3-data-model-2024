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
  admin: boolean = false,
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

export const findAllUsers = async () => {
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

/*
  Delete
*/

export const deleteUserById = async (
  userId: number
): Promise<UserOutput | null> => {
  return await db.user.delete({
    where: { userId },
  });
};

export const deleteUserByEmail = async (
  email: string
): Promise<UserOutput | null> => {
  return await db.user.delete({
    where: { email },
  });
};

export const deleteUserByNick = async (
  nick: string
): Promise<UserOutput | null> => {
  return await db.user.delete({
    where: { nick },
  });
};

/*
  Update
*/

export const updateUserById = async (
  userId: number,
  email: string,
  nick: string,
  fullName: string,
  admin: boolean = false,
  videos = null,
  comments = null
): Promise<UserOutput | null> => {
  return await db.user.update({
    where: { userId },
    data: {
      email,
      nick,
      fullName,
      admin,
    },
  });
};

export const updateUserByEmail = async (
  email: string,
  nick: string,
  fullName: string,
  admin: boolean = false,
  videos = null,
  comments = null
): Promise<UserOutput | null> => {
  return await db.user.update({
    where: { email },
    data: {
      email,
      nick,
      fullName,
      admin,
    },
  });
};

export const updateUserByNick = async (
  email: string,
  nick: string,
  fullName: string,
  admin: boolean = false,
  videos = null,
  comments = null
): Promise<UserOutput | null> => {
  return await db.user.update({
    where: { nick },
    data: {
      email,
      nick,
      fullName,
      admin,
    },
  });
};
