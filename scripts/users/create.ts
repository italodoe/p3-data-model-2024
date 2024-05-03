import { Prisma } from "@prisma/client";
import { newUser } from "../../src/users";
import {
  forceExit,
  getRandomBetween,
  isUserInfo,
  normalizeTextCRUD,
  printUserQuery,
} from "../utils/utils";
import { domains, nameList } from "../../prisma/data-seed";

const errorData = `
Invalid user creation data. Please provide correct details`;
const usageText = `
Usage: bun scripts/users/create.ts [options]

Options:
  -r, --random <integer>    Create a user with random data between 1-10

  -j, --json '{"email": "<string>", "nick": "<string>", "fullName": "<string>", "admin": <true|false>}'
                            Create a user with JSON data.
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
  case "-h":
  case "--help": {
    forceExit(0, usageText);
    break;
  }
  case "-r":
  case "--random": {
    const n = parseInt(q);
    if (isNaN(n) || (!isNaN(n) && (n < 1 || n > 10))) {
      forceExit(1, usageText);
    }
    for (let i = 0; i < n; i++) {
      try {
        const userInfo = generateRandomInfo();
        const user = await newUser(
          userInfo.email,
          userInfo.nick,
          userInfo.firstName + " " + userInfo.lastName
        );

        printUserQuery(
          user,
          normalizeTextCRUD(String(user.userId), "CREATED-RANDOMLY"),
          false
        );
      } catch (error) {
        console.error(error);
        forceExit(1);
      }
    }

    forceExit(0);
    break;
  }
  case "-j":
  case "--json": {
    if (typeof q === "undefined") forceExit(1);

    try {
      let data = JSON.parse(q);
      if (isUserInfo(data)) {
        const user = await newUser(
          data.email,
          data.nick,
          data.fullName??null,
          data.admin
        );
        printUserQuery(
          user,
          normalizeTextCRUD(JSON.stringify(data), "CREATED-BY-JSON"),
          false
        );
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          console.log("There is a unique constraint violation", e.meta);
          forceExit(1);
        }
      }
      console.error(errorData);
    }
    forceExit(0);
    break;
  }
  default: {
    forceExit(1, usageText);
    break;
  }
}

function generateRandomInfo() {
  const rand1 = getRandomBetween(1, 4);
  const rand2 = getRandomBetween(2, 5);
  var firstName = "";
  var lastName = "";

  for (let i = 0; i < rand1; ++i) {
    const firstIndex = getRandomBetween(0, nameList.length - 1);
    firstName += nameList[firstIndex];
  }
  for (let i = 0; i < rand2; ++i) {
    const secondIndex = getRandomBetween(0, nameList.length - 1);
    lastName += nameList[secondIndex];
  }

  const email =
    firstName +
    "." +
    lastName +
    "@" +
    nameList[getRandomBetween(0, nameList.length - 1)] +
    domains[getRandomBetween(0, domains.length - 1)];

  const nick = firstName[0] + lastName;

  return { firstName, lastName, email, nick };
}
