import { ChangeEvent, CSSProperties } from "react";
import InputMask from "react-text-mask";

interface ICpfInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  style?: CSSProperties;
}

export function CPFInput({ onChange, value, style }: ICpfInputProps) {
  return (
    <InputMask
      style={style}
      mask={[
        /[1-9]/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ]}
      onChange={onChange}
      value={value}
      placeholder="CPF"
      className="form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-gray-300 rounded transition m-0 focus:text-gray-700 focus:bg-white focus:border-cyan-600 focus:outline-none"
    />
  );
}
