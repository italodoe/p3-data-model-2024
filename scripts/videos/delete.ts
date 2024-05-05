import {
  errorHandler,
  forceExit,
  normalizeTextCRUD,
  printVideoQuery,
} from "../utils/utils";
import {
  deleteVideoByAuthor,
  deleteVideoById,
  deleteVideoByUrl,
} from "../../src/videos";

const errorData = `
Video delete failed.`;
const usageText = `
Usage: bun scripts/videos/delete.ts [options]

Or

Usage: bun tsx scripts/videos/delete.ts [options]

Options:

-i, --id <videoId>          Delete video by video ID
                            Provide the video ID of the video to delete
                            Example: -v 123

-u, --url <url_code>        Delete user by video URL code
                            Provide the url of the video to delete
                            Example: -u 'aNapFsNDbZE'

-a, --author <authorId>     Delete user by video AUTHOR
                            Provide the authorID of the video to delete all
                            Example: -a 66

-h, --help                  Display this help message`;

if (process.argv.length !== 4) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const by = process.argv[3];

switch (option) {
  //by videoId
  case "-v":
  case "--videoId":
  case "--videoid":
  case "--video":
  case "-i":
  case "-id": {
    try {
      const videoId = parseInt(by);
      if (isNaN(videoId)) {
        forceExit(1, usageText);
      }
      const deleted = await deleteVideoById(videoId);
      if (deleted)
        printVideoQuery(
          deleted,
          normalizeTextCRUD(String(videoId), "DELETED-BY-ID"),
          true
        );
    } catch (e: any) {
      errorHandler(e, "videoID");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  //by url
  case "-u":
  case "--url": {
    try {
      const url = String(by);
      const deleted = await deleteVideoByUrl(url);
      if (deleted)
        printVideoQuery(
          deleted,
          normalizeTextCRUD(String(url), "DELETED-BY-URL")
        );
    } catch (e: any) {
      errorHandler(e, "url");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  //by authorId
  case "-a":
  case "--authorId":
  case "--authorid": {
    try {
      const authorId = parseInt(by);
      if (isNaN(authorId)) {
        forceExit(1, usageText);
      }
      const deleted = await deleteVideoByAuthor(authorId);

      console.log(
        "VIDEO  >>  ",
        normalizeTextCRUD(String(authorId), "DELETED-BY-AUTHOR"),
        deleted
      );
      forceExit(0);
    } catch (e: any) {
      errorHandler(e, "videoID");
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
