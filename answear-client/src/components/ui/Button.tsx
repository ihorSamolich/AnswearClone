import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const buttonVariants = cva("inline-flex gap-1 items-center border font-medium rounded focus:outline-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50",
      primary: "bg-indigo-200 dark:bg-indigo-500 border-transparent text-black dark:text-white hover:opacity-90 ",
    },
    size: {
      default: "px-4 py-2 text-sm",
      sm: "px-2.5 py-1.5 text-xs font-bold",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-2 text-base",
      xl: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button ref={ref} className={classNames(buttonVariants({ variant, size }), className)} {...props} />;
});

export default Button;
