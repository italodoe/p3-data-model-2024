import type { Prisma } from "@prisma/client";
import { findUserByEmail, findUserById, findUserByNick } from "../../src/users";
import {
  forceExit,
  normalizeTextCRUD,
  printVideoNotFound,
  printVideoQuery,
  validateEmail,
} from "../utils/utils";
import {
  finVideoByAuthorEmail,
  finVideoByAuthorId,
  finVideoByAuthorNick,
} from "../../src/videos";

const usageText = `Usage: bun scripts/videos/find [options]

Options:
  -a, --author <authorId>       Search for a video by authorId
  -e, --email <email>           Search for a video by author email
  -n, --nick <nickname>         Search for a video by author nickname
  -h, --help                    Display this help message`;

if (process.argv.length != 4) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const by = process.argv[3];

switch (option) {
  case "-a":
  case "--author":
  case "--authorId":
  case "--authorid":
  case "--a":
  case "--userId":
  case "--userid":
  case "--user":
  case "--id":
  case "--u":
  case "--user": {
    const id = parseInt(by);
    if (isNaN(id)) {
      forceExit(1, usageText);
    }

    try {
      const arrayById = await finVideoByAuthorId(id);
      if (arrayById && arrayById.length) {
        printVideoArray(
          arrayById,
          normalizeTextCRUD(String(id), "FIND-BY-AUTHOR-ID")
        );
        forceExit(0);
      }
      printVideoNotFound();
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
      const arrayByEmail = await finVideoByAuthorEmail(email);
      if (arrayByEmail && arrayByEmail.length) {
        printVideoArray(
          arrayByEmail,
          normalizeTextCRUD(email, "FIND-BY-AUTHOR-EMAIL")
        );
        console.log(arrayByEmail);

        forceExit(0);
      }
      printVideoNotFound();
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
      const arrayByNick = await finVideoByAuthorNick(nick);
      if (arrayByNick && arrayByNick.length) {
        printVideoArray(
          arrayByNick,
          normalizeTextCRUD(nick, "FIND-BY-AUTHOR-NICK")
        );
        forceExit(0);
      }
      printVideoNotFound();
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

function printVideoArray(videos: Prisma.VideoCreateInput[], text: string) {
  videos.forEach((value: Prisma.VideoCreateInput, key) => {
    printVideoQuery(value, text, false);
  });
}
