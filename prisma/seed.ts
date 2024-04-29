import { Prisma, PrismaClient, type User } from "@prisma/client";
import {
  firstNames,
  lastNames,
  usageText,
  videoComments,
  videoInfos,
} from "./data-seed";

const getRandomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var n: number = firstNames.length;
var users: User[] = [];

console.log(`
firstNames ${firstNames.length}
lastNames ${lastNames.length}
videoInfos ${videoInfos.length}
videoComments ${videoComments.length}
`);

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
  const index = getRandomBetween(0, firstNames.length - 1);
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
const getRandomVideoInfo = () => {
  const index = getRandomBetween(0, videoInfos.length - 1);
  const videoInfo = videoInfos[index];
  videoInfos.splice(index, 1);
  return {
    url: videoInfo.url,
    title: videoInfo.title,
    description: videoInfo.description,
  };
};

const getRandomCommentInfo = () => {
  const index = getRandomBetween(0, videoComments.length - 1);
  const comment = videoComments[index];
  videoComments.splice(index, 1);
  return comment;
};

for (let i = 0; i < n; ++i) {
  const info = getRandomUserInfo();

  const user = await db.user.create({
    data: {
      email: info.email,
      nick: info.nick,
      fullName: info.fullName,
      admin: info.admin,
      videos: {
        createMany: {
          data: [
            getRandomVideoInfo(),
            getRandomVideoInfo(),
          ],
        },
      },
    },

    include: {
      videos: true,
      comments: true,
    },
  });

  for (let i = 0; i < user.videos.length; ++i) {
    const comment = await db.comment.create({
      data: {
        text: getRandomCommentInfo(),
        videoId: user.videos[i].videoId,
        authorId: user.userId,
      },
    });
    user.comments.push(comment);
  }

  users.push(user);
}

console.log("users", users);
