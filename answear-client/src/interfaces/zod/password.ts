import { z } from "zod";

export const NewPasswordSchema = z
    .object({
        password: z.string().min(6, "Пароль повинен містити мінімум 8 символів"),
        passwordRepeat: z.string().min(6, "Пароль повинен містити мінімум 8 символів"),
        token: z.string().nonempty("Токен обов'язковий"),
        email: z.string().email("Невірний формат електронної пошти"),
    })
    .refine((data) => data.password === data.passwordRepeat, {
        message: "Паролі не співпадають",
        path: ["passwordRepeat"],
    });

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;
