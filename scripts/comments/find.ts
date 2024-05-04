import {
  findAllCommentsByAuthorEmail,
  findAllCommentsByAuthorId,
  findAllCommentsByAuthorNick,
  findAllCommentsByParent,
  findAllCommentsByVideoAuthor,
  findAllCommentsByVideoId,
  findAllCommentsByVideoUrl,
  findCommentById,
  type CommentOutput,
} from "../../src/comments";
import {
  forceExit,
  normalizeTextCRUD,
  printCommentNotFound,
  printCommentQuery,
  validateEmail,
} from "../utils/utils";

const usageText = `Usage: bun scripts/comments/find.ts [options]

Or

Usage: bun tsx scripts/comments/find [options]

Options:
  -i, --id <commentId>             Find a comment by its ID
  -a, --author <authorId>          Find comments by author ID
  -e, --email <email>              Find comments by author email
  -n, --nick <nickname>            Find comments by author nickname
  -v, --video <videoId>            Find comments by video ID
  -u, --url <url>                  Find comments by video URL
  -va, --video-author <videoId> <authorId>    Find comments by video ID and author ID
  -p, --parent <commentId>          Find comments by parent ID
  -h, --help                        Display this help message`;

if (process.argv.length != 4 && process.argv.length != 5) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const by = process.argv[3];
const q = process.argv[4];

switch (option) {
  case "-i":
  case "--id": {
    const id = parseInt(by);
    if (isNaN(id)) {
      forceExit(1, usageText);
    }
    try {
      const byId: any = await findCommentById(id);
      if (byId) {
        printCommentQuery(
          byId,
          normalizeTextCRUD(String(id), "FIND-BY-ID"),
          true
        );
      }
      printCommentNotFound(true);
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-a":
  case "--author":
  case "--authorId":
  case "--authorid": {
    const id = parseInt(by);
    if (isNaN(id)) {
      forceExit(1, usageText);
    }

    try {
      const arrayById = await findAllCommentsByAuthorId(id);
      if (arrayById && arrayById.length) {
        printCommentArray(
          arrayById,
          normalizeTextCRUD(String(id), "FIND-BY-AUTHOR-ID")
        );
        forceExit(0);
      }
      printCommentNotFound();
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
      const arrayByEmail = await findAllCommentsByAuthorEmail(by);
      if (arrayByEmail && arrayByEmail.length) {
        printCommentArray(
          arrayByEmail,
          normalizeTextCRUD(String(email), "FIND-BY-AUTHOR-EMAIL")
        );
        forceExit(0);
      }
      printCommentNotFound();
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
      const arrayByNick = await findAllCommentsByAuthorNick(nick);
      if (arrayByNick && arrayByNick.length) {
        printCommentArray(
          arrayByNick,
          normalizeTextCRUD(String(nick), "FIND-BY-AUTHOR-NICK")
        );
        forceExit(0);
      }
      printCommentNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-v":
  case "--video":
  case "--videoId":
  case "--videoid": {
    const id = parseInt(by);
    if (isNaN(id)) {
      forceExit(1, usageText);
    }

    try {
      const arrayByVideoId = await findAllCommentsByVideoId(id);
      if (arrayByVideoId && arrayByVideoId.length) {
        printCommentArray(
          arrayByVideoId,
          normalizeTextCRUD(String(id), "FIND-BY-VIDEO-ID")
        );
        forceExit(0);
      }
      printCommentNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-u":
  case "--url": {
    try {
      const url = String(by);
      const arrayByUrl = await findAllCommentsByVideoUrl(url);
      if (arrayByUrl && arrayByUrl.length) {
        printCommentArray(
          arrayByUrl,
          normalizeTextCRUD(String(url), "FIND-BY-VIDEO-URL")
        );
        forceExit(0);
      }
      printCommentNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-va":
  case "--video-author":
  case "--videoId-authorId": {
    const videoId = parseInt(by);
    const authorId = parseInt(q);
    if (isNaN(videoId) || isNaN(authorId)) {
      forceExit(1, usageText);
    }

    try {
      const arrayByVideoIdAuthorId = await findAllCommentsByVideoAuthor(
        videoId,
        authorId
      );
      if (arrayByVideoIdAuthorId && arrayByVideoIdAuthorId.length) {
        printCommentArray(
          arrayByVideoIdAuthorId,
          normalizeTextCRUD(
            String(videoId) + `-` + String(authorId),
            "FIND-BY-VIDEO-ID--AUTHOR-ID"
          )
        );
        forceExit(0);
      }
      printCommentNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  case "-p":
  case "--parent": {
    const id = parseInt(by);
    if (isNaN(id)) {
      forceExit(1, usageText);
    }

    try {
      const arrayByParentId = await findAllCommentsByParent(id);
      if (arrayByParentId && arrayByParentId.length) {
        printCommentArray(
          arrayByParentId,
          normalizeTextCRUD(String(id), "FIND-BY-VIDEO-PARENT-ID")
        );
        forceExit(0);
      }
      printCommentNotFound();
    } catch (error) {
      console.error(error);
    }

    break;
  }

  // default
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

function printCommentArray(comments: any[], text: string) {
  comments.forEach((value: CommentOutput, key) => {
    printCommentQuery(value, text, false);
  });
}
