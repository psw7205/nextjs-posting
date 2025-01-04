"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { uploadResponse } from "@/components/response/action";
import { formatToTimeAgo } from "@/lib/utils";
import { useActionState, useOptimistic } from "react";

interface tweetResponse {
  id: number;
  body: string;
  user: { username: string };
  created_at: Date;
}

export default function ResponseList({
  list,
  id,
}: {
  list: tweetResponse[];
  id: number;
}) {
  const [optimisticList, addOptimisticResponse] = useOptimistic<
    tweetResponse[],
    tweetResponse
  >(list, (state, newResponse) => [{ ...newResponse }, ...state]);

  const formAction = async (_: unknown, formData: FormData) => {
    addOptimisticResponse({
      id: 0,
      body: formData.get("body") as string,
      user: {
        username: "...",
      },
      created_at: new Date(),
    });

    return uploadResponse(_, formData);
  };

  const [state, action] = useActionState(formAction, null);

  return (
    <ul className="py-5">
      {optimisticList.map((item) => {
        return (
          <li key={item.id} className="mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <div className="">{item.user.username}</div>
              <div className="text-right">
                {formatToTimeAgo(item.created_at)}
              </div>
            </div>

            <div className="">{item.body}</div>
          </li>
        );
      })}

      <div>
        <form action={action} className="flex flex-col">
          <div className="">
            <Input
              name="body"
              type="text"
              required
              errors={state?.fieldErrors.body}
            />
            <Input hidden name="tweet_id" defaultValue={id} />
            <div className="pt-4 text-red-400">
              {state?.fieldErrors.tweet_id}
            </div>
          </div>

          <Button text="댓글 작성" />
        </form>
      </div>
    </ul>
  );
}
