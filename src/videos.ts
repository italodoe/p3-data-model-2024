import { db } from "./db";

/*
  Find
*/

export const findAllVideos = async () => {
  return await db.video.findMany({
    include: {
      author: true,
      comments: true,
    },
  });
};

//find by author

export const finVideoByAuthorId = async (userId: number) => {
  return await db.video.findMany({
    where: { authorId: userId },
    include: {
      author: true,
      comments: true,
    },
  });
};

export const finVideoByAuthorEmail = async (email: string) => {
  return await db.video.findMany({
    where: {
      author: {
        email: email,
      },
    },
    include: {
      author: true,
      comments: true,
    },
  });
};

export const finVideoByAuthorNick = async (nick: string) => {
  return await db.video.findMany({
    where: {
      author: {
        nick: nick,
      },
    },
    include: {
      author: true,
      comments: true,
    },
  });
};
