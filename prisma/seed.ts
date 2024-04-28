import { Prisma, PrismaClient, type User } from "@prisma/client";

var firstNames: string[] = [
  "John",
  "Emma",
  "Michael",
  "Sarah",
  "David",
  "Olivia",
  "James",
  "Emily",
  "William",
  "Sophia",
  "Ava",
  "Noah",
  "Isabella",
  "Liam",
  "Charlotte",
  "Ethan",
  "Amelia",
  "Mason",
  "Mia",
  "Benjamin",
  "Mateo",
  "Alejandra",
  "Louis",
  "Camille",
  "Giovanni",
  "Isabella",
  "Lukas",
  "Sophie",
  "Dmitri",
  "Natalia",
  "Hiroshi",
  "Sakura",
  "Wei",
  "Li",
  "Thiago",
  "Gabriela",
  "Lachlan",
  "Matilda",
];

var lastNames: string[] = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Hernandez",
  "Garcia",
  "Dubois",
  "Leroy",
  "Rossi",
  "Conti",
  "Muller",
  "Schmidt",
  "Ivanov",
  "Petrova",
  "Sato",
  "Tanaka",
  "Wang",
  "Zhang",
  "Silva",
  "Santos",
  "Smith",
  "Wilson",
];

const getRandomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var n: number = firstNames.length;
var users: User[] = [];
const usageText = `Usage: bun seed.ts <number-of-users>

Error: Please provide the correct number of users to generate the seed data.

<number-of-users> must be a positive integer between 1 and ${
  firstNames.length
}, inclusive.

Example: bun seed.ts ${getRandomBetween(1, firstNames.length)}`;

if (process.argv.length > 3) {
  console.error(usageText);
  process.exit(1);
} else if (process.argv.length === 3) {
  n = parseInt(process.argv[2]);
  if (n < 1 || n > firstNames.length) {
    console.error(usageText);
    process.exit(1);
  }
}

const [_bun, _run, ...args] = process.argv;
console.log(_bun, _run);

const db = new PrismaClient({
  //https://www.prisma.io/docs/orm/reference/prisma-client-reference
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

db.$on("warn", (e) => {
  console.log(e);
});

db.$on("info", (e) => {
  console.log(e);
});

db.$on("error", (e) => {
  console.log(e);
});

// interface user

const getRandomUserInfo = () => {
  const index = getRandomBetween(0, firstNames.length-1);
  const firsName = firstNames[index];
  const lastName = lastNames[index];
  firstNames.splice(index, 1);
  lastNames.splice(index, 1);

  return {
    email: firsName.toLowerCase() + "." + lastName.toLowerCase() + "@nerv.net",
    nick: firsName[0].toLowerCase() + lastName,
    fullName: firsName + " " + lastName,
    admin: false,
  };
};

async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return await db.user.create({
    data,
    select: {
      userId: true,
      email: true,
      nick: true,
    },
  });
}

for (let i = 0; i < n; ++i) {
  const info = getRandomUserInfo();

  const user = await db.user.create({
    data: {
      email: info.email,
      nick: info.nick,
      fullName: info.fullName,
      admin: info.admin,
    },
  });
  console.log(
    `user created: 
    >> id: ${user.userId} 
    >> email: ${user.email} 
    >> nick: ${user.nick} 
    >> fullName: ${user.fullName}`
  );
  users.push(user);
}

console.log("users", users);
