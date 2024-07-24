import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React, { useState } from "react";

const inputVariants = cva("bg-white my-1.5 border border-[#dbdce0] text-black focus:ring-black focus:border-black block w-full", {
  variants: {
    variant: {
      default: "text-xs font-semibold",
    },
    size: {
      default: "h-[40px] max-h-[40px] px-4 py-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface InputPasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  icon: React.ReactNode;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, size, variant, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={classNames("relative")}>
        <input
          type={showPassword ? "text" : "password"}
          className={classNames(inputVariants({ variant, size }), className, "pr-10")}
          ref={ref}
          {...props}
        />
        <span
          className={`absolute ${showPassword ? "text-[#000000]" : "text-[#dbdce0]"} inset-y-0 right-0 pr-3 flex items-center cursor-pointer`}
          onClick={togglePasswordVisibility}
        >
          {icon}
        </span>
      </div>
    );
  },
);

export default InputPassword;
