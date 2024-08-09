import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconLoader2 } from "@tabler/icons-react";
import { useAppDispatch } from "app/hooks.ts";
import { setCredentials } from "app/userSlice.ts";
import ForgotPasswordForm from "components/form/ForgotPasswordForm.tsx";
import { Attention, Button, Input, InputPassword, Label, Link } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { IErrorResponse } from "interfaces/index.ts";
import { IUser } from "interfaces/user";
import { UserLoginSchema, UserLoginSchemaType } from "interfaces/zod/user.ts";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {useGoogleSignInMutation, useSignInMutation} from "services/user.ts";
import { jwtParser } from "utils/jwtParser.ts";
import { setLocalStorageItem } from "utils/localStorageUtils.ts";

import React, { useState } from "react";

const LoginForm: React.FC = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [signIn, { isLoading: signInIsLoading }] = useSignInMutation();
    const [googleSignIn, { isLoading: googleSignInIsLoading }] = useGoogleSignInMutation();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLoginSchemaType>({ resolver: zodResolver(UserLoginSchema) });

    const onSubmit = async (data: UserLoginSchemaType) => {
        try {
            const response = await signIn(data).unwrap();
            if (response.token === null) {
                toast.error("Помилка: Не вдалося авторизуватися!", toastOptions);
                return;
            }
            setUser(response.token);
            toast.success("Успішна авторизація!", toastOptions);
        } catch (error) {
            const errorResponse = error as IErrorResponse;
            toast.error(`Помилка: ${errorResponse.data.message}`, toastOptions);
        }
    };
    const setUser = (token: string) => {
        setLocalStorageItem("authToken", token);

        dispatch(
            setCredentials({
                user: jwtParser(token) as IUser,
                token: token,
            }),
        );
    };
    const authSuccess = async (credentialResponse: CredentialResponse) => {
        const res = await googleSignIn({
            credential: credentialResponse.credential || "",
        });

        if (res && "data" in res && res.data) {
            setUser(res.data.token);
            toast.success(`Авторизація успішна!`, toastOptions);
        } else {
            toast.error(`Помилка авторизаціі. Перевірте ваші дані!`, toastOptions);
        }
    };
    const authError = () => {
        console.log("Error login. Check your Gmail account!");
    };

    return (
        <div className="w-full max-w-xl p-8 space-y-8">
            <h2 className="text-xl font-bold">Я маю Акаунт</h2>
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
                        <Button size="full">{signInIsLoading || googleSignInIsLoading ? <IconLoader2 className="animate-spin" /> : "Увійдіть"}</Button>
                    </div>
                </form>
            )}
            <div className="flex items-center justify-center mt-6 space-x-4">
                <p className="text-sm font-bold">Або продовжити за допомогою</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
                {/*<Link variant="icon" size="iconlg">*/}
                {/*    <img className="w-6 h-6" alt="google logo" src="/assets/googleFlag.png" />*/}
                {/*</Link>*/}
                <GoogleLogin
                    useOneTap
                    locale="uk"
                    size="large"
                    onSuccess={authSuccess}
                    onError={authError}
                />
            </div>
        </div>
    );
};

export default LoginForm;
