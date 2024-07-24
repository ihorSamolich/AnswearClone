import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const labelVariants = cva("block text-black", {
  variants: {
    variant: {
      default: "text-xs font-semibold",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, size, ...props }, ref) => (
  <label ref={ref} className={classNames(labelVariants({ variant, size }), className)} {...props} />
));
export default Label;
