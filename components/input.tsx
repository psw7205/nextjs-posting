import { ReactNode } from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  icon: ReactNode;
  value?: string;
  error?: string;
}

export default function Input({
  name,
  type,
  placeholder,
  required,
  icon,
  value,
  error,
}: InputProps) {
  return (
    <div className="group">
      <div className="relative flex">
        {icon}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          defaultValue={value}
          className={`${error ? "outline-red-500 focus:ring-red-500" : "outline-gray-200 focus:ring-gray-600"} w-full rounded-full bg-white py-4 pl-14 pr-4 outline outline-2 placeholder:text-gray-400 focus:ring-2 focus:ring-offset-4`}
        />
      </div>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
}
