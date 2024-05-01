import type { Prisma } from "@prisma/client";
import { findUserByEmail, findUserById, findUserByNick } from "../../src/users";
import { forceExit, printUserNotFound, printUserQuery } from "./utils";

const usageText = `Usage: bun scripts/user/find [options]

Options:
  -u, --user <userId>           Search for a user by userId
  -e, --email <email>           Search for a user by email
  -n, --nick <nickname>         Search for a user by nickname
  -h, --help                    Display this help message`;

if (process.argv.length != 4) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const q = process.argv[3];

switch (option) {
  case "-u":
  case "--userId": 
  case "--userid": 
  case "--user": 
  case "--id": 
  {
    const id = parseInt(q);
    if (isNaN(id)) {
      forceExit(1, usageText);
    }

    try {
      const byId = await findUserById(id);
      if (byId) {
        printUserQuery(byId, `id:${q}`);
      }
      printUserNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-e":
  case "--email": {
    try {
      const byEmail = await findUserByEmail(q);
      if (byEmail) {
        printUserQuery(byEmail, `email:${q}`);
      }
      printUserNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-n":
  case "--nick":
  case "--nickname": {
    try {
      const byNick = await findUserByNick(q);
      if (byNick) {
        printUserQuery(byNick, `nick:${q}`);
      }
      printUserNotFound();
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
