import { CSSProperties, ReactNode } from "react";

interface ISimpleButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  handleClick?: () => void;
  style?: CSSProperties;
}

export function SimpleButton({
  handleClick,
  children,
  type,
  style,
}: ISimpleButtonProps) {
  return (
    <button
      onClick={handleClick}
      type={type}
      style={style}
      className="bg-cyan-600 p-4 text-sm text-white font-medium uppercase rounded shadow-md hover:bg-cyan-700 hover:shadow-lg transition duration-150"
    >
      {children}
    </button>
  );
}
