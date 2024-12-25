"use client";

import Button from "@/components/button";
import { useActionState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { KeyIcon } from "@heroicons/react/16/solid";
import Input from "@/components/input";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { handleForm } from "@/app/log-in/action";
import Link from "next/link";

export default function Login() {
  const [state, action] = useActionState(handleForm, null);

  return (
    <div className="mx-auto flex flex-col gap-10 p-6">
      <div className="mx-auto flex size-48">
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="fill-red-500 stroke-red-500"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
          ></path>
          <path
            className="fill-white stroke-white"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
          ></path>
        </svg>
      </div>
      <form action={action} className="flex flex-col gap-6">
        <div className="">
          <Input
            name="email"
            type="email"
            required
            placeholder="Email"
            errors={state?.fieldErrors.email}
            icon={
              <EnvelopeIcon
                aria-hidden="true"
                className="absolute ml-4 size-8 self-center text-gray-400"
              />
            }
          />
        </div>
        <div className="">
          <Input
            name="password"
            type="password"
            required
            placeholder="Password"
            errors={state?.fieldErrors.password}
            icon={
              <KeyIcon
                aria-hidden="true"
                className="absolute ml-4 size-8 self-center text-gray-400"
              />
            }
          />
        </div>
        <Button text="Log in" />

        <Link href="/create-account" className="text-right hover:underline">
          회원가입
        </Link>

        {false && (
          <div className="flex w-full items-center rounded-lg bg-green-500 p-4 font-bold">
            <CheckBadgeIcon className="mr-2 size-8" /> Welcom Back!
          </div>
        )}
      </form>
    </div>
  );
}
