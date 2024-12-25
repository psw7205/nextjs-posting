"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchem = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(5, "Username should be at least 5 characters long."),
    password: z
      .string()
      .min(8, "Password should be at least 10 characters long.")
      .regex(/\d+/, "Password should contain at least one number (0~9)"),
    confirm_password: z.string().min(8),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function handleForm(_: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const res = await formSchem.safeParseAsync(data);
  console.log({ res });
  if (res.success) {
    const hashedPassword = await bcrypt.hash(res.data.password, 12);
    const user = await db.user.create({
      data: {
        username: res.data.username,
        email: res.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  } else {
    console.log(res.error.flatten());
    return res.error.flatten();
  }
}
