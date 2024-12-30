"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { uploadTweet } from "@/components/tweet/action";
import { useActionState } from "react";

export default function AddTweet() {
  const [state, action] = useActionState(uploadTweet, null);

  return (
    <div>
      <form action={action} className="flex flex-col gap-5 p-5">
        <div className="">
          <Input
            name="tweet"
            type="text"
            required
            errors={state?.fieldErrors.tweet}
          />
        </div>

        <Button text="작성 완료" />
      </form>
    </div>
  );
}
