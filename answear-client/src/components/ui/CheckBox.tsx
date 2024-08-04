import { VariantProps, cva } from "class-variance-authority";
import { classNames } from "utils/classNames.ts";

import React, { forwardRef } from "react";

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

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
        VariantProps<typeof checkboxVariants> {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, variant, size, checked, onChange, ...props }, ref) => {
    return (
        <label className={classNames(checkboxVariants({ variant, size }), className, `border-${checked ? "black" : "gray-300"}`)}>
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" ref={ref} {...props} />
            {/* Custom checkmark */}
            <div
                className={`w-4 h-4 bg-black rounded-sm absolute transition-opacity duration-500 ${checked ? "opacity-100" : "opacity-0"}`}
            ></div>
        </label>
    );
});

CheckBox.displayName = "CheckBox";

export default CheckBox;
