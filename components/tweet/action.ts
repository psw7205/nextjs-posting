"use server";

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const tweetSchema = z.object({
  tweet: z.string({
    required_error: "tweet is required",
  }),
});

export async function uploadTweet(_: unknown, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
      });
      redirect(`/`);
    }
  }
}

export async function likePost(tweet_id: number) {
  const session = await getSession();
  try {
    const res = await db.like.create({
      data: {
        tweet_id,
        user_id: session.id!,
      },
      select: {
        id: true,
      },
    });

    revalidatePath(`/tweet/${tweet_id}`);
    return res.id;
  } catch (e) {
    console.log(e);
  }
}

export async function dislikePost(id: number, tweet_id: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id,
        user_id: session.id!,
      },
    });

    revalidatePath(`/tweet/${tweet_id}`);
  } catch (e) {
    console.log(e);
  }
}
