import { IconMail } from "@tabler/icons-react";
import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React from "react";

const inputVariants = cva(
    " my-1.5 border-0 border-b-2 border-[#dbdce0] text-black focus:ring-0 focus:border-black block w-full",
    {
        variants: {
            variant: {
                default: "text-xs font-semibold",
            },
            size: {
                default: "h-[40px] max-h-[40px]  py-0.5 pl-12 pr-[1px]", // pl-10 для простору іконки
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
        VariantProps<typeof inputVariants> {}

const InputEmail = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, size, variant, type = "text", ...props }, ref) => {
        return (
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0   flex items-center pointer-events-none">
                    <IconMail size={34} />
                </span>
                <input type={type} className={classNames(inputVariants({ variant, size, className }))} ref={ref} {...props} />
            </div>
        );
    },
);

export default InputEmail;
