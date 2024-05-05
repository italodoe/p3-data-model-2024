import { updateCommentById } from "../../src/comments";
import {
  errorHandler,
  forceExit,
  isCommentInfo,
  normalizeTextCRUD,
  printCommentQuery,
} from "../utils/utils";

const errorData = `
Comment update failed. Please provide valid details.`;
const usageText = `
Usage: bun scripts/comments/update.ts [options]

or

bunx tsx scripts/comments/update.ts [options]


Options:

-j, --json '<json_details>'                  '{ "text": "<string>", "commentId": <number>, "parentId": <number>|null }'
                                             Update comment details by comment ID
                                             Provide the comment ID into Json string to edit and new details in JSON format.
                                             Example: -j '{ "text": "This song pumped me up so hard I cleaned my whole room.", 
                                             "commentId": 52, "parentId": 37 }'

-h, --help                                   Display this help message`;

if (process.argv.length !== 3 && process.argv.length !== 4) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const q = process.argv[3];

switch (option) {
  case "-j":
  case "--json":
  case "-i":
  case "--id":
  case "--commentid":
  case "--commentId": {
    try {
      let data = JSON.parse(q);
      if (isCommentInfo(data, true)) {
        const updated: any = await updateCommentById(
          data.commentId,
          data.text,
          data.parentId ?? null
        );
        if (updated)
          printCommentQuery(
            updated,
            normalizeTextCRUD(JSON.stringify(data), "UPDATED-BY-JSON")
          );
      }
    } catch (e: any) {
      errorHandler(e, "Json");
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
