import {
  forceExit,
  normalizeTextCRUD,
  printVideoNotFound,
  printVideoQuery,
  validateEmail,
} from "../utils/utils";
import {
  findAllVideosByAuthorEmail,
  findAllVideosByAuthorId,
  findAllVideosByAuthorNick,
  findVideoByDescription,
  findVideoById,
  findVideoByTitle,
  findVideoByUrl,
  type VideoOutput,
} from "../../src/videos";

const usageText = `Usage: bun scripts/videos/find.ts [options]

Or

Usage: bun tsx scripts/videos/find.ts [options]

Options:
  -i, --id <videoId>       Search for a video by videoId
  -a, --author <authorId>       Search for a video by authorId
  -e, --email <email>           Search for a video by author email
  -n, --nick <nickname>         Search for a video by author nickname
  -u, --url <url>               Search for a video by url
  -t, --title <term>            Search for a video by title
  -d, --description <term>      Search for a video by description
  -h, --help                    Display this help message`;

if (process.argv.length != 4) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const by = process.argv[3];

switch (option) {
  case "-v":
  case "--video":
  case "--videoId":
  case "--videoid":
  case "--id":
  case "-i": {
    const id = parseInt(by);
    if (isNaN(id)) {
      forceExit(1, usageText);
    }
    try {
      const byId: any = await findVideoById(id);
      if (byId) {
        printVideoQuery(
          byId,
          normalizeTextCRUD(String(id), "FIND-BY-VIDEO-ID"),
          true
        );
      }
      printVideoNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-a":
  case "--author":
  case "--authorId":
  case "--authorid":
  case "--a": {
    const id = parseInt(by);
    if (isNaN(id)) {
      forceExit(1, usageText);
    }

    try {
      const arrayById = await findAllVideosByAuthorId(id);
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
      const arrayByEmail = await findAllVideosByAuthorEmail(email);
      if (arrayByEmail && arrayByEmail.length) {
        printVideoArray(
          arrayByEmail,
          normalizeTextCRUD(email, "FIND-BY-AUTHOR-EMAIL")
        );
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
      const arrayByNick = await findAllVideosByAuthorNick(nick);
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

  case "-u":
  case "--url":
  case "--URL": {
    try {
      const url = String(by);
      const byUrl: any = await findVideoByUrl(url);
      if (byUrl) {
        printVideoQuery(
          byUrl,
          normalizeTextCRUD(url, "FIND-BY-VIDEO-URL"),
          true
        );
      }
      printVideoNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-t":
  case "-s":
  case "--title":
  case "--search": {
    try {
      const title = String(by);
      const arrayByTitle = await findVideoByTitle(title);
      if (arrayByTitle && arrayByTitle.length) {
        printVideoArray(
          arrayByTitle,
          normalizeTextCRUD(title, "FIND-BY-TITLE")
        );
        forceExit(0);
      }
      printVideoNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-d":
  case "--desc":
  case "--description": {
    try {
      const desc = String(by);
      const arrayByDesc = await findVideoByDescription(desc);
      if (arrayByDesc && arrayByDesc.length) {
        printVideoArray(
          arrayByDesc,
          normalizeTextCRUD(desc, "FIND-BY-DESCRIPTION")
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

function printVideoArray(videos: any[], text: string) {
  videos.forEach((value: VideoOutput, key) => {
    printVideoQuery(value, text, false);
  });
}
