import { getTweets } from "@/app/actions";
import AddTweet from "@/components/tweet/add";
import TweetList from "@/components/tweet/list";

export default async function Home() {
  const tweets = await getTweets();

  return (
    <>
      <AddTweet />
      <div>
        <TweetList initTweets={tweets} />
      </div>
    </>
  );
}
