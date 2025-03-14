import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button = ({ onClick, children, disabled, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
