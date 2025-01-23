// components/ui/button.tsx
import React from "react";
import classNames from "classnames";

export const Button = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={classNames(
      "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
      className
    )}
  >
    {children}
  </button>
);
