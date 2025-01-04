import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface Tweet {
  tweet: string;
  id: number;
  created_at: Date;
  user: {
    username: string;
  } | null;
}

export default function TweetCard({ id, tweet, user, created_at }: Tweet) {
  return (
    <li className="py-5">
      <Link href={`tweets/${id}`}>
        <div className="">
          <div className="mb-4 flex justify-between">
            <div className="">{id}</div>
            <div className="">{user?.username}</div>
          </div>

          <div className="">{tweet}</div>
          <div className="text-right">{formatToTimeAgo(created_at)}</div>
        </div>
      </Link>
    </li>
  );
}
