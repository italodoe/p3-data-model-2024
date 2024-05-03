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
