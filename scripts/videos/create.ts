import { Prisma } from "@prisma/client";
import {
  forceExit,
  isVideoInfo,
  normalizeTextCRUD,
  printVideoQuery,
} from "../utils/utils";
import { newVideo } from "../../src/videos";

const errorData = `
Invalid video creation data. Please provide correct details`;
const usageText = `
Usage: bun scripts/videos/create.ts [options]

Options:

  -j, --json <useId> '{}'
                            Create a user with JSON data.
                            Enclose the JSON object with curly braces {}
                            Enclose the entire JSON string with single quotes '
                            Enclose field names and string values with double quotes "

  -h, --help                Display this help message`;

if (process.argv.length != 5) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const userId = process.argv[3];
const q = process.argv[4];

switch (option) {
  case "-j":
  case "--json": {
    if (typeof q === "undefined") forceExit(1);

    try {
      let data = JSON.parse(q);
      if (isVideoInfo(data)) {
        const video = await newVideo(
          data.authorId,
          data.url,
          data.title,
          data.description ?? null
        );
        printVideoQuery(
          video,
          normalizeTextCRUD(JSON.stringify(data), "CREATED-BY-JSON"),
          false
        );
      }
    } catch (e) {
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
