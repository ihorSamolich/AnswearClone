import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Attention, Button, Input, Label } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { IErrorResponse } from "interfaces/index.ts";
import { ForgotPasswordSchema, ForgotPasswordSchemaType } from "interfaces/zod/password.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "services/user.ts";

import React from "react";

const ForgotPasswordForm: React.FC = () => {
    const [forgotPassword, { isLoading: forgotPasswordInIsLoading }] = useForgotPasswordMutation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordSchemaType>({ resolver: zodResolver(ForgotPasswordSchema) });

    const onSubmit = async (data: ForgotPasswordSchemaType) => {
        try {
            await forgotPassword(data).unwrap();
            navigate("/auth/sign-in");
            toast.success("Інструкція з відновлення пароля надіслана на ваш email!", toastOptions);
        } catch (error) {
            const errorResponse = error as IErrorResponse;
            toast.error(`Помилка: ${errorResponse.data.message}`, toastOptions);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
            <h3 className="text-base font-bold">Не пам'ятаю пароль</h3>
            <p className="text-xs text-[#6b6b6b]">
                Введи e-mail, вказаний Тобою під час реєстрації, і ми відразу ж надішлемо Тобі інструкцію, як змінити пароль.
            </p>
            <div>
                <Label htmlFor="email">Введіть коректний адрес електронної пошти*</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <Attention>{errors.email.message}</Attention>}
            </div>
            <div className="flex items-center justify-center mt-4">
                <Button size="full">{forgotPasswordInIsLoading ? <IconLoader2 className="animate-spin" /> : "Вислати"}</Button>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
