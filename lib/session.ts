import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  const res = await cookies();
  return getIronSession<SessionContent>(res, {
    cookieName: "login-form",
    password: process.env.COOKIE_PASSWORD!,
  });
}
