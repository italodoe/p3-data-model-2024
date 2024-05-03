import { findAllVideos } from "../../src/videos";
import { forceExit } from "../users/utils";

const usageText = `Usage: bun scripts/user/all [options]

Description:
  This script retrieves all videos along with their authors and comments.

Options:
  -h, --help                    Display this help message`;

const option = process.argv[2];
if (option === "-h" || option === "--help") forceExit(0, usageText);

try {
  const videos = await findAllVideos();
  videos.forEach((value, key) => {
    console.log(`Video ${key + 1}  >>   `, value, `\n`);
  });
} catch (error) {
  console.error(error);
}
