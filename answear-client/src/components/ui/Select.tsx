import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

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

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, size, variant, ...props }, ref) => {
  return <select className={classNames(inputVariants({ variant, size, className }))} ref={ref} {...props} />;
});

export default Select;
