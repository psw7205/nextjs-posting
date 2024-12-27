"use server";

import db from "@/lib/db";

export async function getTweets(page = 0) {
  return await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
    },
    skip: page * 8,
    take: 8,
    orderBy: {
      created_at: "desc",
    },
  });
}
