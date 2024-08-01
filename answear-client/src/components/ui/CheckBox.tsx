import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React, { forwardRef, useState } from "react";

const checkboxVariants = cva("relative inline-flex items-center justify-center border-2 rounded-sm cursor-pointer", {
    variants: {
        variant: {
            default: "",
        },
        size: {
            default: "h-6 w-6",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export interface CheckboxProps extends Omit<React.HTMLProps<HTMLDivElement>, "size">, VariantProps<typeof checkboxVariants> {}

const CheckBox = forwardRef<HTMLDivElement, CheckboxProps>(({ className, variant, size, ...props }, ref) => {
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked(!checked);
    };

    return (
        <div
            className={classNames(
                checkboxVariants({ variant, size }),
                className,
                `border-${checked ? "black" : "gray-300"}`, // Change border color based on checked state
            )}
            onClick={handleClick}
            ref={ref}
            {...props}
        >
            {/* Custom checkmark */}
            <div
                className={`w-4 h-4 bg-black rounded-sm absolute transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}
            ></div>
            {/* Invisible input for accessibility */}
            <input type="checkbox" className="sr-only" checked={checked} onChange={() => {}} />
        </div>
    );
});

CheckBox.displayName = "CheckBox";

export default CheckBox;
