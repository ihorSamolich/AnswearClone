import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const buttonVariants = cva("h-[44px] max-h-[44px] inline-flex items-center justify-center text-sm font-semibold", {
    variants: {
        variant: {
            default: "bg-black text-white transition hover:bg-black/80 duration-400 ease-in-out",
            primary: "bg-white text-black hover:bg-black hover:text-white transition duration-400 ease-in-out",
            underline: "h-auto underline",
            icon: "bg-white h-6 w-6 px-0 py-0",
        },
        size: {
            default: "w-full max-w-[140px] px-2",
            full: "w-full",
            span: "px-0 py-0",
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