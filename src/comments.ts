/*
  Find
*/

import { db } from "./db";

export const findAllComments = async () => {
  return await db.comment.findMany({
    include: {
      children: true,
      parent: true,
      video: true,
      author: true,
    },
  });
};

export const findAllCommentsByAuthorId = async (authorId: number) => {
  return await db.comment.findMany({
    where: { authorId },
    include: {
      children: true,
      parent: true,
    },
  });
};

export const findAllCommentsByAuthorNick = async (nick: string) => {
  return await db.comment.findMany({
    where: {
      author: {
        nick,
      },
    },
    include: {
      children: true,
      parent: true,
    },
  });
};

export const findAllCommentsByAuthorEmail = async (email: string) => {
  return await db.comment.findMany({
    where: {
      author: {
        email,
      },
    },
    include: {
      children: true,
      parent: true,
    },
  });
};

export const findAllCommentsByVideoId = async (videoId: number) => {
  return await db.comment.findMany({
    where: {
      videoId,
    },
    include: {
      children: true,
      parent: true,
    },
  });
};

export const findAllCommentsByVideoUrl = async (videoId: number) => {
  return await db.comment.findMany({
    where: {
      videoId,
    },
    include: {
      children: true,
      parent: true,
    },
  });
};

export const findAllCommentsByVideoAuthor = async (
  videoId: number,
  authorId: number
) => {
  return await db.comment.findMany({
    where: {
      videoId,
      authorId,
    },
    include: {
      children: true,
      parent: true,
    },
  });
};

// comment
export const findCommentById = async (commentId: number) => {
  return await db.comment.findFirst({
    where: { commentId },
    include: {
      children: true,
    },
  });
};

/*
  Create
*/

export const newComment = async (
  authorId: number,
  videoId: number,
  text: string,
  parentId: number | null,
  comments = null
) => {
  return await db.comment.create({
    data: {
      authorId,
      videoId,
      text,
      parentId,
    },
  });
};

/*
  Delete
*/

export const deleteCommentById = async (commentId: number) => {
  return await db.comment.delete({
    where: { commentId },
  });
};

export const deleteCommentsByVideoId = async (videoId: number) => {
  return await db.comment.deleteMany({
    where: { videoId },
  });
};

export const deleteCommentsByAuthorId = async (authorId: number) => {
  return await db.comment.deleteMany({
    where: { authorId },
  });
};

/*
  Update
*/

export const updateCommentById = async (
  commentId: number,
  text: string,
  parentId: number | null,
  comments = null
) => {
  return await db.comment.update({
    where: { commentId },
    data: {
      text,
      parentId,
    },
  });
};

export const updateCommentByAuthorVideo = async (
  commentId: number,
  videoId: number,
  authorId: number | null,
  text: string,
  parentId: number | null,
  comments = null
) => {
  return await db.comment.updateMany({
    where: { commentId, videoId, authorId },
    data: {
      text,
      parentId,
    },
  });
};
