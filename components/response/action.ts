"use server";

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";

const bodySchema = z.object({
  body: z.string({
    required_error: "body is required",
  }),
  tweet_id: z.coerce.number().superRefine(async (val, ctx) => {
    console.log(val);

    const tweet = await db.tweet.findUnique({
      where: {
        id: val,
      },
      select: {
        id: true,
      },
    });

    if (!tweet) {
      ctx.addIssue({
        code: "custom",
        message: "tweet not found",
        path: ["tweet_id"],
        fatal: true,
      });
      return z.NEVER;
    }
  }),
});

export async function uploadResponse(_: unknown, formData: FormData) {
  const data = {
    body: formData.get("body"),
    tweet_id: formData.get("tweet_id"),
  };

  const result = await bodySchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      await db.response.create({
        data: {
          body: result.data.body,
          user: {
            connect: {
              id: session.id,
            },
          },
          tweet: {
            connect: {
              id: result.data.tweet_id,
            },
          },
        },
      });

      revalidatePath(`/tweet/${result.data.tweet_id}`);
    }
  }
}

export async function getResponseList(id: number) {
  return await db.response.findMany({
    select: {
      id: true,
      body: true,
      created_at: true,
      user: {
        select: { username: true },
      },
    },
    where: {
      tweet_id: id,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}
