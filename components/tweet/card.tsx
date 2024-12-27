import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface Tweet {
  id: number;
  tweet: string;
  created_at: Date;
}

export default function TweetCard({ id, tweet, created_at }: Tweet) {
  return (
    <li className="py-5">
      <Link href={`tweets/${id}`}>
        <div className="">
          <div className="">{id}</div>
          <div className="">{tweet}</div>
          <div className="text-right">{formatToTimeAgo(created_at)}</div>
        </div>
      </Link>
    </li>
  );
}
