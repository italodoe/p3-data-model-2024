import { findAllVideos } from "../../src/videos";
import { forceExit } from "../utils/utils";

const usageText = `Usage: bun scripts/videos/all.ts [options]

or

bunx tsx scripts/videos/all.ts [options]

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
