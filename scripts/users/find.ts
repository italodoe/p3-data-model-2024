import type { Prisma } from "@prisma/client";
import { findUserByEmail, findUserById, findUserByNick } from "../../src/users";

const usageText = `Usage: bun scripts/user/find [options]

Options:
  -i, --id <userId>             Search for a user by ID
  -e, --email <email>           Search for a user by email
  -n, --nick <nickname>         Search for a user by nickname
  -h, --help                    Display this help message`;

if (process.argv.length != 4) {
  forceExit(1);
}

const option = process.argv[2];
const q = process.argv[3];

switch (option) {
  case "-i":
  case "--id": {
    const id = parseInt(q);
    if (isNaN(id)) {
      forceExit(1);
    }

    const byId = await findUserById(id);
    if (byId) {
      printUser(byId, "id");
    }
    printNotFound();
    break;
  }

  case "-e":
  case "--email": {
    const byEmail = await findUserByEmail(q);
    if (byEmail) {
      printUser(byEmail, "email");
    }
    printNotFound();
    break;
  }

  case "-n":
  case "--nick":
  case "--nickname": {
    const byNick = await findUserByNick(q);
    if (byNick) {
      printUser(byNick, "email");
    }
    printNotFound();
    break;
  }
  case "-h":
  case "--help": {
    console.error(usageText);
    break;
  }

  default: {
    forceExit(1);
    break;
  }
}

function forceExit(code: number, withError: boolean = true) {
  if (withError) console.error(usageText);
  process.exit(code);
}

function printUser(
  user: Prisma.UserCreateInput,
  type: string,
  exit: boolean = true
) {
  console.log(`User >> ${type}:${q}  >>   `, user, `\n`);
  if (exit) process.exit(0);
}
function printNotFound(exit: boolean = true) {
  console.info(`User not found\n`);
  if (exit) process.exit(0);
}
