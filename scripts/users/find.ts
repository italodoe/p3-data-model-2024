import { findUserByEmail, findUserById, findUserByNick } from "../../src/users";
import {
  forceExit,
  normalizeTextCRUD,
  printUserNotFound,
  printUserQuery,
  validateEmail,
} from "../utils/utils";

const usageText = `Usage: bun scripts/users/find [options]

Or

Usage: bun tsx scripts/users/find.ts [options]

Options:
  -i, --id <userId>             Search for a user by userId
  -e, --email <email>           Search for a user by email
  -n, --nick <nickname>         Search for a user by nickname
  -h, --help                    Display this help message`;

if (process.argv.length != 4) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const by = process.argv[3];

switch (option) {
  case "-i":
  case "-u":
  case "--userId":
  case "--userid":
  case "--user":
  case "--id": {
    const id = parseInt(by);
    if (isNaN(id)) {
      forceExit(1, usageText);
    }
    try {
      const byId = await findUserById(id);
      if (byId) {
        printUserQuery(byId, normalizeTextCRUD(String(id), "FIND-BY-ID"), true);
      }
      printUserNotFound(true);
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-e":
  case "--email": {
    try {
      const email = String(by);
      if (!validateEmail(email)) {
        forceExit(1, usageText);
      }
      const byEmail = await findUserByEmail(by);
      if (byEmail) {
        printUserQuery(
          byEmail,
          normalizeTextCRUD(email, "FIND-BY-EMAIL"),
          true
        );
      }
      printUserNotFound(true);
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-n":
  case "--nick":
  case "--nickname": {
    try {
      const nick = String(by);
      const byNick = await findUserByNick(nick);
      if (byNick) {
        printUserQuery(byNick, normalizeTextCRUD(nick, "FIND-BY-NICK"), true);
      }
      printUserNotFound(true);
    } catch (error) {
      console.error(error);
    }

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
