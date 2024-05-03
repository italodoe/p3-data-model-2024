import type { Prisma } from "@prisma/client";
import { db } from "./db";
export type VideoOutput = Prisma.VideoCreateInput;
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

// find by video

export const findVideoById = async (videoId: number) => {
  return await db.video.findFirst({
    where: { videoId },
    include: {
      author: true,
      comments: true,
    },
  });
};

export const findVideoByUrl = async (url: string) => {
  return await db.video.findFirst({
    where: { url },
    include: {
      author: true,
      comments: true,
    },
  });
};

export const findVideoByTitleDeprecated = async (search: string) => {
  return await db.$queryRaw`SELECT * FROM Video WHERE title LIKE ${`%${
    search || ""
  }%`} `;
};

export const findVideoByTitle = async (title: string) => {
  return await db.video.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    include: {
      author: true,
      comments: true,
    },
  });
};

export const findVideoByDescription = async (description: string) => {
  return await db.video.findMany({
    where: {
      description: {
        contains: description,
      },
    },
    include: {
      author: true,
      comments: true,
    },
  });
};

/*
  Create
*/

export const newVideo = async (
  authorId: number,
  url: string,
  title: string,
  description: string | null,
  comments = null
) => {
  return await db.video.create({
    data: {
      authorId,
      url,
      title,
      description,
    },
  });
};
