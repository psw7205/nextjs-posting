import { getResponseList } from "@/components/response/action";
import ResponseList from "@/components/response/list";
import LikeButton from "@/components/tweet/like";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number | null) {
  if (!userId) return false;

  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweet(id: number) {
  return await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}

async function getLikeStatus(tweet_id: number) {
  const session = await getSession();
  const isLiked = await db.like.findFirst({
    where: {
      tweet_id,
      user_id: session.id!,
    },
    select: {
      id: true,
    },
  });

  const likeCount = await db.like.count({
    where: {
      tweet_id,
    },
  });
  return {
    likeCount,
    likeId: isLiked?.id,
    isLiked: Boolean(isLiked),
  };
}

export default async function TweetDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await props.params).id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  const { likeCount, isLiked, likeId } = await getLikeStatus(id);

  const list = await getResponseList(id);

  const isOwner = await getIsOwner(tweet.user_id);
  return (
    <div className="h-lvh w-96">
      <div>
        <div className="mb-6">
          <h3>{tweet.user?.username}</h3>
        </div>
        <div className="">
          <div className="">{tweet.tweet}</div>
          <div className="mt-6 text-right text-sm text-neutral-600">
            {formatToTimeAgo(tweet.created_at)}{" "}
          </div>
        </div>
        <div className="">
          {isOwner ? (
            <div className="mt-12 flex justify-end gap-2">
              <button className="rounded-md bg-neutral-600 p-2 text-white">
                수정
              </button>
              <button className="rounded-md bg-red-600 p-2 text-white">
                삭제
              </button>
            </div>
          ) : null}
        </div>

        <LikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          tweetId={id}
          likeId={likeId}
        />

        <hr className="my-5 border-b" />

        <ResponseList list={list} id={id} />
      </div>
    </div>
  );
}
