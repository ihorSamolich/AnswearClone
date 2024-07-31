import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconLoader2 } from "@tabler/icons-react";
import ForgotPasswordForm from "components/form/ForgotPasswordForm.tsx";
import { Attention, Button, Input, InputPassword, Label, Link } from "components/ui";
import { IErrorResponse } from "interfaces/index.ts";
import { UserLoginSchema, UserLoginSchemaType } from "interfaces/zod/user.ts";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSignInMutation } from "services/user.ts";
import { setLocalStorageItem } from "utils/localStorageUtils.ts";

import React, { useState } from "react";

const LoginForm: React.FC = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [signIn, { isLoading: signInIsLoading }] = useSignInMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLoginSchemaType>({ resolver: zodResolver(UserLoginSchema) });

    const onSubmit = async (data: UserLoginSchemaType) => {
        try {
            const response = await signIn(data).unwrap();
            setLocalStorageItem("authToken", response.token);
            toast("Wow so easy!");
        } catch (error) {
            const errorResponse = error as IErrorResponse;
            toast(errorResponse.data.message);
        }
    };

    return (
        <div className="w-full max-w-xl p-8 space-y-8">
            <h2 className="text-2xl font-bold">Я маю Акаунт</h2>
            {showForgotPassword ? (
                <ForgotPasswordForm />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
                    <div>
                        <div>
                            <Label htmlFor="email">Електронна пошта*</Label>
                            <Input type="email" id="email" {...register("email")} />
                            {errors.email && <Attention>{errors.email.message}</Attention>}
                        </div>
                        <div>
                            <Label htmlFor="password">Пароль*</Label>
                            <InputPassword id="password" {...register("password")} icon={<IconEye />} />
                            {errors.password && <Attention>{errors.password.message}</Attention>}
                        </div>
                        <div className="flex justify-end text-xs">
                            <Link variant="underline" size="span" onClick={() => setShowForgotPassword(true)}>
                                Забули пароль?
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button size="full">{signInIsLoading ? <IconLoader2 className="animate-spin" /> : "Увійдіть"}</Button>
                    </div>
                </form>
            )}
            <div className="flex items-center justify-center mt-6 space-x-4">
                <p className="text-sm font-bold">Або продовжити за допомогою</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
                <Link variant="icon" size="iconlg">
                    <img className="w-6 h-6" alt="google logo" src="/assets/googleFlag.png" />
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
