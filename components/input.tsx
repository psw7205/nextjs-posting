import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps {
  name: string;
  icon: ReactNode;
  errors?: string[];
}

export default function Input({
  name,
  icon,
  errors,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="group">
      <div className="relative flex">
        {icon}
        <input
          name={name}
          {...props}
          className={`${errors ? "outline-red-500 focus:ring-red-500" : "outline-gray-200 focus:ring-gray-600"} w-full rounded-full bg-white py-4 pl-14 pr-4 outline outline-2 placeholder:text-gray-400 focus:ring-2 focus:ring-offset-4`}
        />
      </div>
      {errors?.map((error, idx) => (
        <div key={idx} className="mt-2 text-red-500">
          {error}
        </div>
      ))}
    </div>
  );
}
