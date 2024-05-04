import { Prisma } from "@prisma/client";
import {
  updateVideoById,
  updateVideoByUrl,
  updateVideoDescriptionById,
  updateVideoTitleById,
  updateVideoViewsById,
} from "../../src/videos";
import {
    errorHandler,
  forceExit,
  isVideoInfo,
  normalizeTextCRUD,
  printVideoQuery,
} from "../utils/utils";

const errorData = `
Video update failed. Please provide valid details.`;
const usageText = `
Usage: bun scripts/videos/update.ts [options]

Options:

-i, --id <videoId> <json_details>           Update video details by video ID
                                            Provide the video ID of the video to edit and new details in JSON format
                                            The provided video ID must match the JSON videoId exactly.
                                            Example: -i 123 '{ "title": "where is my mind?", "url": "aNapFsNDbZE", 
                                            "description": "Nice, deal", "authorId": 39, "videoId": 123  }'

-url, --url <url> <json_details>            Update video details by video URL
                                            Provide the url of the video to edit and new details in JSON format
                                            The provided URL must match the JSON URL exactly.
                                            Example: -u aNapFsNDbZE '{ "title": "where is my mind?", "url": "aNapFsNDbZE", 
                                            "description": "Nice, deal", "authorId": 39 }'

-d, --description <videoId> <term>          Update video description by video ID
                                            Provide the video ID of the video to edit
                                            Example: -d "this is an amazon video."

-t, --title <videoId> <term>                Update video title  by video ID
                                            Provide the video ID  of the video to edit
                                            Example: -d 44 "New Aerosmith concert [OLD]"

-v, --views <videoId>                       Update video views  by video ID
                                            Provide the video ID  of the video to increase its view count by one
                                            Example: -v 44

-h, --help                                  Display this help message`;

if (process.argv.length < 4 && process.argv.length > 5) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const by = process.argv[3];
const q = process.argv[4];

switch (option) {
  case "-i":
  case "--videoId":
  case "--videoid":
  case "--id": {
    try {
      const videoId = parseInt(by);
      if (isNaN(videoId)) {
        forceExit(1, usageText);
      }
      let data = JSON.parse(q);
      if (isVideoInfo(data, true)) {
        const updated = await updateVideoById(
          videoId,
          data.url,
          data.title,
          data.description ?? null
        );
        if (updated)
          printVideoQuery(
            updated,
            normalizeTextCRUD(String(videoId), "UPDATED-BY-ID"),
            true
          );
      }
    } catch (e) {
      errorHandler(e, "videoId");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  // by url
  case "-u":
  case "--url": {
    try {
      const url = String(by);
      let data = JSON.parse(q);
      if (isVideoInfo(data)) {
        const updated = await updateVideoByUrl(
          url,
          data.title,
          data.description ?? null
        );
        if (updated)
          printVideoQuery(
            updated,
            normalizeTextCRUD(String(url), "UPDATED-BY-URL")
          );
      }
    } catch (e) {
      errorHandler(e, "url");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  // title by id
  case "-t":
  case "--title": {
    try {
      const videoId = parseInt(by);
      if (isNaN(videoId)) {
        forceExit(1, usageText);
      }
      const title = String(q);

      const updated = await updateVideoTitleById(videoId, title);
      if (updated)
        printVideoQuery(
          updated,
          normalizeTextCRUD(String(videoId), "UPDATED-TITLE-BY-ID"),
          true
        );
    } catch (e) {
      errorHandler(e, "videoId");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  // description by id
  case "-d":
  case "--description": {
    try {
      const videoId = parseInt(by);
      if (isNaN(videoId)) {
        forceExit(1, usageText);
      }
      const description = String(q);

      const updated = await updateVideoDescriptionById(videoId, description);
      if (updated)
        printVideoQuery(
          updated,
          normalizeTextCRUD(String(videoId), "UPDATED-DESCRIPTION-BY-ID"),
          true
        );
    } catch (e) {
      errorHandler(e, "videoId");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  // increase views
  case "-v":
  case "--views": {
    try {
      const videoId = parseInt(by);
      if (isNaN(videoId)) {
        forceExit(1, usageText);
      }
      const updated = await updateVideoViewsById(videoId);
      if (updated)
        printVideoQuery(
          updated,
          normalizeTextCRUD(String(videoId), "UPDATED-VIEWS-BY-ID"),
          true
        );
    } catch (e) {
      errorHandler(e, "videoId");
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
