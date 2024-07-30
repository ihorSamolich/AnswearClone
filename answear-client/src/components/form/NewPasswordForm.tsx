import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconLoader2 } from "@tabler/icons-react";
import { Attention, Button, InputPassword, Label } from "components/ui";
import { NewPasswordSchema, NewPasswordSchemaType } from "interfaces/zod/password.ts";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const NewPasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NewPasswordSchemaType>({
        resolver: zodResolver(NewPasswordSchema),
    });

    const onSubmit = async (data: NewPasswordSchemaType) => {
        try {
            // Тут можна додати функцію зміни пароля, наприклад, запит на сервер
            toast("Пароль успішно змінено!");
        } catch (error) {
            // Обробка помилок
            toast("Сталася помилка при зміні пароля.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl p-8 space-y-8">
                <h2 className="text-2xl font-bold text-left">Створити новий пароль</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
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
                        <Button size="full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <IconLoader2 className="animate-spin" /> : "Ок"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPasswordForm;
