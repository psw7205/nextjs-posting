"use client";

import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic, useState } from "react";
import { dislikePost, likePost } from "@/components/tweet/action";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
  likeId?: number;
}

export default function LikeButton({
  isLiked,
  likeId,
  likeCount,
  tweetId: tweetId,
}: LikeButtonProps) {
  const [like_id, setlikeId] = useState<number | undefined>(likeId);

  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    }),
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked && like_id) {
      await dislikePost(like_id, tweetId);
    } else {
      const id = await likePost(tweetId);
      setlikeId(id!);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border border-neutral-400 p-2 text-sm text-neutral-400 transition-colors ${
        state.isLiked ? "border-red-500 bg-red-500" : "hover:bg-neutral-800"
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="size-5 fill-white" />
      ) : (
        <OutlineHandThumbUpIcon className="size-5" />
      )}
      {state.isLiked ? (
        <span className="text-white"> {state.likeCount}</span>
      ) : (
        <span>{state.likeCount}</span>
      )}
    </button>
  );
}
