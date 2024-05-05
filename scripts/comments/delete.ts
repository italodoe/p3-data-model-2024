import {
  deleteCommentById,
  deleteCommentsByAuthorId,
  deleteCommentsByVideoId,
} from "../../src/comments";
import {
  errorHandler,
  forceExit,
  normalizeTextCRUD,
  printCommentQuery,
} from "../utils/utils";

const errorData = `
Comment delete failed.`;
const usageText = `
Usage: bun scripts/comments/delete.ts [options]

Or

Usage: bun tsx scripts/comments/delete.ts [options]

Options:

-i, --id <commentId>        Delete a comment by its ID
                            Provide the ID of the comment to delete
                            Example: -i 22

-v, --video <video>         Delete comments by video ID
                            Provide the ID of the video to delete comments from
                            Example: -v 33

-a, --author <authorId>     Delete comments by author ID
                            Provide the ID of the author to delete comments from
                            Example: -a 55

-h, --help                  Display this help message`;

if (process.argv.length !== 4) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const by = process.argv[3];

switch (option) {
  //by id

  case "-i":
  case "--id": {
    try {
      const commentsId = parseInt(by);
      if (isNaN(commentsId)) {
        forceExit(1, usageText);
      }
      const deleted: any = await deleteCommentById(commentsId);
      if (deleted)
        printCommentQuery(
          deleted,
          normalizeTextCRUD(String(commentsId), "DELETED-BY-ID"),
          true
        );
    } catch (e: any) {
      errorHandler(e, "commentId");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  //by videoId

  case "-v":
  case "--video":
  case "--videoId":
  case "--videoid": {
    try {
      const videoId = parseInt(by);
      if (isNaN(videoId)) {
        forceExit(1, usageText);
      }
      const deleted: any = await deleteCommentsByVideoId(videoId);
      console.log(
        "VIDEO  >>  ",
        normalizeTextCRUD(String(videoId), "DELETED-BY-VIDEO"),
        deleted
      );
      forceExit(0);
    } catch (e: any) {
      errorHandler(e, "videoId");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  //by authorId

  case "-a":
  case "--author":
  case "--authorId":
  case "--authorid": {
    try {
      const authorId = parseInt(by);
      if (isNaN(authorId)) {
        forceExit(1, usageText);
      }
      const deleted: any = await deleteCommentsByAuthorId(authorId);
      console.log(
        "VIDEO  >>  ",
        normalizeTextCRUD(String(authorId), "DELETED-BY-AUTHOR"),
        deleted
      );
      forceExit(0);
    } catch (e: any) {
      errorHandler(e, "authorId");
      console.error(errorData);
    }
    forceExit(1, usageText);

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
