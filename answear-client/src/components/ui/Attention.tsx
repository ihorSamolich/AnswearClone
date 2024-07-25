import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const attentionVariants = cva("block text-red-400", {
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

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof attentionVariants> {}

const Attention = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, size, ...props }, ref) => (
  <label ref={ref} className={classNames(attentionVariants({ variant, size }), className)} {...props} />
));
export default Attention;
