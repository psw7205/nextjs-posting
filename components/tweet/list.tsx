"use client";

import { getTweets } from "@/app/actions";
import TweetCard from "@/components/tweet/card";
import { PER_PAGE } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { Prisma } from "@prisma/client";
import { useState } from "react";

export type TweetsProps = Prisma.PromiseReturnType<typeof getTweets>;

interface TweetListProps {
  initTweets: TweetsProps;
}

export default function TweetList({ initTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const movePage = async (currentPage: number, offset: number) => {
    setIsLoading(true);

    const newTweets = await getTweets(currentPage + offset);
    if (newTweets.length < PER_PAGE) {
      setIsLastPage(true);
    } else {
      setTweets(() => [...newTweets]);
      setIsLastPage(false);
    }

    setPage((prev) => prev + offset);
    setIsLoading(false);
  };

  return (
    <>
      <ul role="list" className="w-screen max-w-lg divide-y divide-neutral-600">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} {...tweet} />
        ))}
      </ul>

      <div className="mt-12 flex items-center justify-between">
        {page !== 0 ? (
          <button
            onClick={() => {
              movePage(page, -1);
            }}
            disabled={isLoading}
            className="text-neutral-600"
          >
            <ChevronLeftIcon className="size-16" />
          </button>
        ) : (
          <div></div>
        )}

        <div>현재 페이지: {page + 1}</div>

        {isLastPage ? (
          <div></div>
        ) : (
          <button
            onClick={() => {
              movePage(page, 1);
            }}
            disabled={isLoading}
            className="text-neutral-600"
          >
            <ChevronRightIcon className="size-16" />
          </button>
        )}
      </div>
    </>
  );
}
