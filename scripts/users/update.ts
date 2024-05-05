import { Prisma } from "@prisma/client";
import {
  updateUserByEmail,
  updateUserById,
  updateUserByNick,
} from "../../src/users";
import {
  errorHandler,
  forceExit,
  isUserInfo,
  normalizeTextCRUD,
  printUserQuery,
  validateEmail,
} from "../utils/utils";

const errorData = `
User update failed. Please provide valid details.`;
const usageText = `
Usage: bun scripts/users/update.ts [options]

or

bunx tsx scripts/users/update.ts [options]

Options:

-i, --id <userId> '<json_details>'          '{"email": "<string>", "nick": "<string>", "fullName": "<string>", "admin": <true|false>}'
                                            Update user details by user ID
                                            Provide the user ID of the user to edit and new details in JSON format
                                            Example: -u 123 '{"email": "new@example.com", "nick": "new_nick", 
                                            "fullName": "New Full Name", "admin": true}'

-e, --email <email> '<json_details>'        '{"email": "<string>", "nick": "<string>", "fullName": "<string>", "admin": <true|false>}'
                                            Update user details by user EMAIL
                                            Provide the email of the user to edit and new details in JSON format
                                            Example: -e 'user@example.com' '{"email": "new@example.com", 
                                            "nick": "new_nick", "fullName": "New Full Name", "admin": true}'

-n, --nick <nickname> '<json_details>'      '{"email": "<string>", "nick": "<string>", "fullName": "<string>", "admin": <true|false>}'
                                            Update user details by user NICK
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
  //by userID
  case "-i":
  case "-u":
  case "--userId":
  case "--userid":
  case "--user":
  case "--id": {
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
          data.fullName ?? null,
          data.admin
        );
        if (updated)
          printUserQuery(
            updated,
            normalizeTextCRUD(String(userId), "UPDATED-BY-ID")
          );
      }
    } catch (e: any) {
      errorHandler(e, "userID");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  //by email
  case "-e":
  case "--email": {
    try {
      const email = String(by);
      if (!validateEmail(email)) {
        forceExit(1, usageText);
      }
      let data = JSON.parse(q);
      if (isUserInfo(data)) {
        const updated = await updateUserByEmail(
          email,
          data.email,
          data.nick,
          data.fullName ?? null,
          data.admin
        );
        if (updated)
          printUserQuery(
            updated,
            normalizeTextCRUD(String(email), "UPDATED-BY-EMAIL")
          );
      }
    } catch (e: any) {
      errorHandler(e, "email");
      console.error(errorData);
    }
    forceExit(1, usageText);

    break;
  }

  //by nick
  case "-n":
  case "--nick": {
    try {
      const nick = String(by);
      let data = JSON.parse(q);
      if (isUserInfo(data)) {
        const updated = await updateUserByNick(
          nick,
          data.nick,
          data.email,
          data.fullName ?? null,
          data.admin
        );
        if (updated)
          printUserQuery(
            updated,
            normalizeTextCRUD(String(nick), "UPDATED-BY-NICK")
          );
      }
    } catch (e: any) {
      errorHandler(e, "nick");
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
