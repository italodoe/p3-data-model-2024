import { Prisma, PrismaClient, type User } from "@prisma/client";
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
];

const n: number = firstNames.length;
var users: User[] = [];

const getRandomUserInfo = () => {
  const index = Math.floor(Math.random() * firstNames.length);
  const firsName = firstNames[index];
  const lastName = lastNames[index];
  firstNames.splice(index, 1)
  lastNames.splice(index, 1)

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

console.log("users", await users);
