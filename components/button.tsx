"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full rounded-full bg-gray-200 p-4 font-bold text-gray-600 transition-transform hover:bg-gray-400 focus:scale-105 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-neutral-300"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
