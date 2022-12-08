import { ChangeEvent } from "react";

interface ISimpleInputProps {
  value: string;
  placeholder: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function SimpleInput({
  value,
  placeholder,
  handleChange,
}: ISimpleInputProps) {
  return (
    <input
      type="text"
      className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-gray-300 rounded transition m-0 focus:text-gray-700 focus:bg-white focus:border-cyan-600 focus:outline-none"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
}
