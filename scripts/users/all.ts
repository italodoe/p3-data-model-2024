import { findAllUsers } from "../../src/users";
import { forceExit } from "../utils/utils";

const usageText = `Usage: bun scripts/users/all [options]

or

bunx tsx scripts/users/all [options]

Description:
  This script retrieves all users along with their videos and comments.

Options:
  -h, --help                    Display this help message`;

const option = process.argv[2];
if (option === "-h" || option === "--help") forceExit(0, usageText);

try {
  const users = await findAllUsers();
  users.forEach((value, key) => {
    console.log(`User ${key + 1}  >>    `, value, `\n`);
  });
} catch (error) {
  console.error(error);
}
