import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconLoader2 } from "@tabler/icons-react";
import { Attention, Button, InputPassword, Label } from "components/ui";
import { IErrorResponse } from "interfaces/index.ts";
import { NewPasswordSchema, NewPasswordSchemaType } from "interfaces/zod/password";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "services/user.ts";

import React from "react";

interface ResetPasswordFormProps {
    token: string;
    email: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token, email }) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPasswordSchemaType>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            token: token,
            email: email,
        },
    });

    const [resetPassword, { isLoading: isLoadingResetPassword }] = useResetPasswordMutation();

    const onSubmit = async (data: NewPasswordSchemaType) => {
        try {
            await resetPassword(data).unwrap();
            navigate("/auth/sign-in");
            toast("Пароль успішно змінено!");
        } catch (error) {
            const errorResponse = error as IErrorResponse;
            toast(errorResponse.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-8 space-y-8">
                <h2 className="text-2xl font-bold text-left">Створити новий пароль</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                    <input type="hidden" {...register("token")} />
                    <input type="hidden" {...register("email")} />
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="password">Новий пароль</Label>
                            <InputPassword id="password" icon={<IconEye />} {...register("password")} />
                            {errors.password && <Attention>{errors.password.message}</Attention>}
                        </div>
                        <div>
                            <Label htmlFor="passwordRepeat">Повторіть новий пароль</Label>
                            <InputPassword id="passwordRepeat" icon={<IconEye />} {...register("passwordRepeat")} />
                            {errors.passwordRepeat && <Attention>{errors.passwordRepeat.message}</Attention>}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button size="full" type="submit" disabled={isLoadingResetPassword}>
                            {isLoadingResetPassword ? <IconLoader2 className="animate-spin" /> : "Ок"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
