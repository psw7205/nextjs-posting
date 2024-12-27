import { getTweets } from "@/app/actions";
import TweetList from "@/components/tweet/list";

export default async function Home() {
  const tweets = await getTweets();

  return (
    <div>
      <TweetList initTweets={tweets} />
    </div>
  );
}
