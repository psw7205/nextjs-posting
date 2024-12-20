"use server";

import { z } from "zod";

const formSchem = z.object({
  email: z
    .string()
    .email()
    .endsWith("@zod.com", "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .regex(/\d+/, "Password should contain at least one number (0~9)"),
});

export async function handleForm(_, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const res = formSchem.safeParse(data);
  console.log({ res });
  if (res.success) {
    return {
      ok: true,
    };
  } else {
    console.log(res.error);
    return {
      ok: false,
      errors: res.error.flatten(),
    };
  }
}
