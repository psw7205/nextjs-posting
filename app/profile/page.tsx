import Button from "@/components/button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1>username: {user?.username}!</h1>
        <h1>email: {user?.email}!</h1>
      </div>
      <form action={logOut}>
        <Button text="Log out" />
      </form>
    </div>
  );
}
