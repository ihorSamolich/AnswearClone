import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const optionVariants = cva("block w-full text-xs font-semibold text-black bg-white", {
  variants: {
    state: {
      default: "",
      disabled: "text-gray-400 bg-gray-100",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export interface OptionProps
  extends Omit<React.OptionHTMLAttributes<HTMLOptionElement>, "state">,
    VariantProps<typeof optionVariants> {}

const Option: React.FC<OptionProps> = ({ className, state, ...props }) => {
  return <option className={classNames(optionVariants({ state }), className)} {...props} />;
};

export default Option;
