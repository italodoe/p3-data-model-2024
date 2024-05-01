import { Prisma } from "@prisma/client";
import { newUser } from "../../src/users";
import { forceExit, getRandomBetween, printUser, validateEmail } from "./utils";

//interfaces
interface userInfo {
  email: string;
  nick: string;
  fullName: string;
  admin: boolean;
}

function isUserInfo(arg: any): arg is userInfo {
  return (
    typeof arg.email === "string" &&
    validateEmail(arg.email) &&
    typeof arg.nick === "string" &&
    typeof arg.fullName === "string" &&
    typeof arg.admin === "boolean"
  );
}

// data arrays
const domains = [
  ".com",
  ".net",
  ".org",
  ".co",
  ".io",
  ".info",
  ".biz",
  ".me",
  ".tv",
  ".us",
  ".ca",
  ".uk",
  ".au",
  ".de",
  ".fr",
  ".es",
  ".it",
  ".nl",
  ".jp",
  ".cn",
  ".edu",
  ".gov",
  ".mil",
  ".int",
  ".mobi",
  ".name",
  ".pro",
  ".travel",
  ".aero",
  ".asia",
];

const nameList = [
  "ba",
  "be",
  "bi",
  "bo",
  "bu",
  "ca",
  "ce",
  "ci",
  "co",
  "cu",
  "da",
  "de",
  "di",
  "do",
  "du",
  "fa",
  "fe",
  "fi",
  "fo",
  "fu",
  "ga",
  "ge",
  "gi",
  "go",
  "gu",
  "ha",
  "he",
  "hi",
  "ho",
  "hu",
  "ja",
  "je",
  "ji",
  "jo",
  "ju",
  "ka",
  "ke",
  "ki",
  "ko",
  "ku",
  "la",
  "le",
  "li",
  "lo",
  "lu",
  "ma",
  "me",
  "mi",
  "mo",
  "mu",
  "na",
  "ne",
  "ni",
  "no",
  "nu",
  "pa",
  "pe",
  "pi",
  "po",
  "pu",
  "ra",
  "re",
  "ri",
  "ro",
  "ru",
  "sa",
  "se",
  "si",
  "so",
  "su",
  "ta",
  "te",
  "ti",
  "to",
  "tu",
  "va",
  "ve",
  "vi",
  "vo",
  "vu",
  "wa",
  "we",
  "wi",
  "wo",
  "wu",
  "ya",
  "ye",
  "yi",
  "yo",
  "yu",
  "za",
  "ze",
  "zi",
  "zo",
  "zu",
  "bla",
  "ble",
  "bli",
  "blo",
  "blu",
  "cla",
  "cle",
  "cli",
  "clo",
  "clu",
  "dla",
  "dle",
  "dli",
  "dlo",
  "dlu",
  "fla",
  "fle",
  "fli",
  "flo",
  "flu",
  "gla",
  "gle",
  "gli",
  "glo",
  "glu",
  "pla",
  "ple",
  "pli",
  "plo",
  "plu",
  "sla",
  "sle",
  "sli",
  "slo",
  "slu",
  "vla",
  "vle",
  "vli",
  "vlo",
  "vlu",
  "bra",
  "bre",
  "bri",
  "bro",
  "bru",
  "cra",
  "cre",
  "cri",
  "cro",
  "cru",
  "dra",
  "dre",
  "dri",
  "dro",
  "dru",
  "fra",
  "fre",
  "fri",
  "fro",
  "fru",
  "gra",
  "gre",
  "gri",
  "gro",
  "gru",
  "pra",
  "pre",
  "pri",
  "pro",
  "pru",
  "sra",
  "sre",
  "sri",
  "sro",
  "sru",
  "vra",
  "vre",
  "vri",
  "vro",
  "vru",
  "bla",
  "ble",
  "bli",
  "blo",
  "blu",
  "cla",
  "cle",
  "cli",
  "clo",
  "clu",
  "dla",
  "dle",
  "dli",
  "dlo",
  "dlu",
  "fla",
  "fle",
  "fli",
  "flo",
  "flu",
  "gla",
  "gle",
  "gli",
  "glo",
  "glu",
  "pla",
  "ple",
  "pli",
  "plo",
  "plu",
  "sla",
  "sle",
  "sli",
  "slo",
  "slu",
  "vla",
  "vle",
  "vli",
  "vlo",
  "vlu",
  "bra",
  "bre",
  "bri",
  "bro",
  "bru",
  "cra",
  "cre",
  "cri",
  "cro",
  "cru",
  "dra",
  "dre",
  "dri",
  "dro",
  "dru",
  "fra",
  "fre",
  "fri",
  "fro",
  "fru",
  "gra",
  "gre",
  "gri",
  "gro",
  "gru",
  "pra",
  "pre",
  "pri",
  "pro",
  "pru",
  "sra",
  "sre",
  "sri",
  "sro",
  "sru",
  "vra",
  "vre",
  "vri",
  "vro",
  "vru",
  "brah",
  "breh",
  "brih",
  "broh",
  "bruh",
  "crah",
  "creh",
  "crih",
  "croh",
  "cruh",
  "drah",
  "dreh",
  "drih",
  "droh",
  "druh",
  "frah",
  "freh",
  "frih",
  "froh",
  "fruh",
  "grah",
  "greh",
  "grih",
  "groh",
  "gruh",
  "prah",
  "preh",
  "prih",
  "proh",
  "pruh",
  "srah",
  "sreh",
  "srih",
  "sroh",
  "sruh",
  "vrah",
  "vreh",
  "vrih",
  "vroh",
  "vruh",
];

const errorData = `
Invalid user creation data. Please provide correct details`;
const usageText = `
Usage: bun scripts/user/create [options]

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
      const userInfo = generateRandomInfo();
      const user = await newUser(
        userInfo.email,
        userInfo.nick,
        userInfo.firstName + " " + userInfo.lastName
      );
      printUser(user, false);
    }

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
          data.fullName,
          data.admin
        );

        printUser(user);
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
    forceExit(1, usageText);
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
