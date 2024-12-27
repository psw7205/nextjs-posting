"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchem = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExists, "An account with this email does not exist."),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .regex(/\d+/, "Password should contain at least one number (0~9)"),
});

export async function handleForm(_: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await formSchem.safeParseAsync(data);
  console.log({ res });

  if (res.success) {
    const user = await db.user.findUnique({
      where: {
        email: res.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(res.data.password, user!.password ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password"],
        },
      };
    }
  } else {
    console.log(res.error);
    return res.error.flatten();
  }
}
