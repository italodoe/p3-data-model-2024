import { Prisma } from "@prisma/client";
import { updateUserById } from "../../src/users";
import {
  forceExit,
  isUserInfo,
  normalizeTextCRUD,
  printUser,
  printUserQuery,
} from "./utils";

const errorData = `
User update failed. Please provide valid details.`;
const usageText = `
Usage: bun scripts/user/update.ts [options]

Options:

-u, --user <userId> <json_details>          Update user details by user ID
                                            Provide the user ID of the user to edit and new details in JSON format
                                            Example: -u 123 '{"email": "new@example.com", "nick": "new_nick", 
                                            "fullName": "New Full Name", "admin": true}'

-e, --email <email> <json_details>          Update user details by user EMAIL
                                            Provide the email of the user to edit and new details in JSON format
                                            Example: -e 'user@example.com' '{"email": "new@example.com", 
                                            "nick": "new_nick", "fullName": "New Full Name", "admin": true}'

-n, --nick <nickname> <json_details>        Update user details by user NICK
                                            Provide the email of the user to edit and new details in JSON format
                                            Example: -n 'user_nick' '{"email": "new@example.com", "nick": "new_nick", 
                                            "fullName": "New Full Name", "admin": true}'

-h, --help                                  Display this help message`;

if (process.argv.length !== 3 && process.argv.length !== 5) {
  forceExit(1, usageText);
}

const option = process.argv[2];
const by = process.argv[3];
const q = process.argv[4];

switch (option) {
  case "-e":
  case "--user": {
    try {
      const userId = parseInt(by);
      if (isNaN(userId)) {
        forceExit(1, usageText);
      }
      let data = JSON.parse(q);
      if (isUserInfo(data)) {
        const updated = await updateUserById(
          userId,
          data.email,
          data.nick,
          data.fullName,
          data.admin
        );
        printUserQuery(updated, normalizeTextCRUD(String(userId), "UPDATE"));
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2025") {
          console.log("Bad userId", e.meta);
          forceExit(1);
        }
      }
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
