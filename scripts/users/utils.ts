import type { Prisma } from "@prisma/client";

export function forceExit(code: number, usageText: string | null = null) {
  if (usageText) console.error(usageText);
  process.exit(code);
}

export const getRandomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export function printUser(user: Prisma.UserCreateInput, exit: boolean = true) {
  console.log(`User >>   `, user, `\n`);
  if (exit) process.exit(0);
}

export function printUserQuery(
  user: Prisma.UserCreateInput,
  text: string,
  exit: boolean = true
) {
  console.log(`User >> ${text}  >>   `, user, `\n`);
  if (exit) process.exit(0);
}

export function printUserNotFound(exit: boolean = true) {
  console.info(`User not found\n`);
  if (exit) process.exit(0);
}
