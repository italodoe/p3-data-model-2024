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

export function errorHandler(e: Error, type: string) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    if (e.code === "P2025") {
      console.log(`Bad ${type} >>`, e.meta);
      forceExit(1);
    }
  }
}


// user
export function printUser(
  user: Prisma.UserCreateInput | null,
  exit: boolean = true
) {
  console.log(`User >>   `, user, `\n`);
  if (exit) process.exit(0);
}

export function printUserQuery(
  user: Prisma.UserCreateInput,
  text: string,
  exit: boolean = true
) {
  console.log(`User >> ${text}  >>  `, user, `\n`);
  if (exit) process.exit(0);
}

export function printUserNotFound(exit: boolean = true) {
  console.info(`\nUser not found\n`);
  if (exit) process.exit(0);
}

// interfaces
export interface userInfo {
  email: string; // Unique
  nick: string; // Unique
  fullName?: string | null;
  admin: boolean;
}

export function isUserInfo(arg: any): arg is userInfo {
  return (
    typeof arg.email === "string" &&
    validateEmail(arg.email) &&
    typeof arg.nick === "string" &&
    (typeof arg.fullName === "string" || arg.fullName == null) &&
    typeof arg.admin === "boolean"
  );
}

export const normalizeTextCRUD = (identity: string, operation: string) => {
  return `\n${identity}:${operation}`;
};

// video
export function printVideoQuery(
  video: Prisma.VideoCreateInput,
  text: string,
  exit: boolean = true
) {
  console.log(`Video >> ${text}  >>  `, video, `\n`);
  if (exit) process.exit(0);
}

export function printVideoNotFound(exit: boolean = true) {
  console.info(`\Video not found\n`);
  if (exit) process.exit(0);
}

interface videoInfo {
  title: string;
  url: string;
  description?: string | null;
  authorId: number;
}

export function isVideoInfo(arg: any): arg is videoInfo {
  return (
    typeof arg.title === "string" &&
    typeof arg.url === "string" &&
    (typeof arg.description === "string" || arg.description == null) &&
    typeof arg.authorId === "number"
  );
}
