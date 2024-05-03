import { Prisma } from "@prisma/client";
import {
  deleteUserByEmail,
  deleteUserById,
  deleteUserByNick,
} from "../../src/users";
import {
  forceExit,
  isUserInfo,
  normalizeTextCRUD,
  printUserQuery,
  validateEmail,
} from "../utils/utils";

const errorData = `
User delete failed.`;
const usageText = `
Usage: bun scripts/users/delete.ts [options]

Options:

-u, --user <userId>       Delete user by user ID
                            Provide the user ID of the user to delete
                            Example: -u 123

-e, --email <email>         Delete user by user EMAIL
                            Provide the email of the user to delete
                            Example: -e 'user@example.com'

-n, --nick <nickname>       Delete user by user NICK
                            Provide the nickname of the user to delete
                            Example: -n 'user_nick'

-h, --help                  Display this help message`;

if (process.argv.length !== 4) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const by = process.argv[3];
const q = process.argv[4];

switch (option) {
  //by userId
  case "-u":
  case "--userId":
  case "--userid":
  case "--user":
  case "--id": {
    try {
      const userId = parseInt(by);
      if (isNaN(userId)) {
        forceExit(1, usageText);
      }
      const deleted = await deleteUserById(userId);
      printUserQuery(
        deleted,
        normalizeTextCRUD(String(userId), "DELETED-BY-ID")
      );
    } catch (e) {
      errorHandler(e, "userID");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  //email
  case "-e":
  case "--email": {
    try {
      const email = String(by);
      if (!validateEmail(email)) {
        forceExit(1, usageText);
      }
      const deleted = await deleteUserByEmail(email);
      printUserQuery(
        deleted,
        normalizeTextCRUD(String(email), "DELETED-BY-EMAIL")
      );
    } catch (e) {
      errorHandler(e, "email");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  //by nick
  case "-n":
  case "--nick": {
    try {
      const nick = String(by);
      const deleted = await deleteUserByNick(nick);
      printUserQuery(
        deleted,
        normalizeTextCRUD(String(nick), "DELETED-BY-NICK")
      );
    } catch (e) {
      errorHandler(e, "nick");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  case "-h":
  case "--help": {
    forceExit(0, usageText);
    break;
  }
  default: {
    forceExit(1, usageText);
    break;
  }
}

function errorHandler(e: Error, type: string) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    if (e.code === "P2025") {
      console.log(`Bad ${type} >>`, e.meta);
      forceExit(1);
    }
  }
}
