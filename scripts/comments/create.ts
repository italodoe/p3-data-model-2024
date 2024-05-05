import { newComment } from "../../src/comments";
import { errorHandler, forceExit, isCommentInfo, normalizeTextCRUD, printCommentQuery } from "../utils/utils";

const errorData = `
Invalid comment creation data. Please provide correct details`;
const usageText = `
Usage: bun scripts/comments/create.ts [options]

or

Usage: bun tsx scripts/comments/create.ts [options]

Options:
  -j, --json '{ "text": "<string>", "videoId": <number>, "authorId": <number>, "parentId": <number or null> }'
                            Create a comment with JSON data.
                            Enclose the JSON object with curly braces {}
                            Enclose the entire JSON string with single quotes '
                            Enclose field names and string values with double quotes "

  -h, --help                Display this help message`;

if (process.argv.length < 3 || process.argv.length > 4) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const q = process.argv[3];

switch (option) {
    case "-j":
    case "--json": {
      if (typeof q === "undefined") forceExit(1);
        console.log(q);
      try {
        let data = JSON.parse(q);
        console.log(data);

        if (isCommentInfo(data)) {
          const comment = await newComment(
            data.authorId,
            data.videoId,
            data.text,
            data.parentId,
          );
          printCommentQuery(
            comment,
            normalizeTextCRUD(JSON.stringify(data), "CREATED-BY-JSON"),
            false
          );
        }
      } catch (e: any) {
        errorHandler(e, "Json");
        console.error(errorData);
      }
      forceExit(0);
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
  