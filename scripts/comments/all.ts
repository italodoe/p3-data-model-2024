import { findAllComments } from "../../src/comments";
import { forceExit } from "../utils/utils";

const usageText = `Usage: bun scripts/comments/all [options]

or

bunx tsx scripts/comments/all [options]

Description:
  This script retrieves all comments along with their videos, authors, and comments.

Options:
  -h, --help                    Display this help message`;

const option = process.argv[2];
if (option === "-h" || option === "--help") forceExit(0, usageText);

try {
  const comments = await findAllComments();
  comments.forEach((value, key) => {
    console.log(`Comment ${key + 1}  >>    `, value, `\n`);
  });
} catch (error) {
  console.error(error);
}
