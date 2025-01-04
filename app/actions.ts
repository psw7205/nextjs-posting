"use server";

import db from "@/lib/db";
import { PER_PAGE } from "@/lib/utils";

export async function getTweets(page = 0) {
  return await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: { username: true },
      },
    },
    skip: page * PER_PAGE,
    take: PER_PAGE,
    orderBy: {
      created_at: "desc",
    },
  });
}
