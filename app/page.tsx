import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl"></span>
        <h1 className="text-4xl">Assignment</h1>
        <h2 className="text-2xl">당근마켓 챌린지</h2>
      </div>
      <div className="flex w-full flex-col items-center gap-3">
        <Link
          href="/create-account"
          className="pw-full rounded-full bg-gray-200 p-4 font-bold text-gray-600 transition-transform hover:bg-gray-400 focus:scale-105 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-neutral-300"
        >
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/log-in" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </>
  );
}
