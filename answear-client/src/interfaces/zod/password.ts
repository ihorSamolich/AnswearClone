import { z } from "zod";

// Визначаємо схему валідації з використанням Zod
export const NewPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: "Пароль має бути не менше 8 символів" })
            .max(100, { message: "Пароль занадто довгий" }),
        passwordRepeat: z
            .string()
            .min(8, { message: "Пароль має бути не менше 8 символів" })
            .max(100, { message: "Пароль занадто довгий" }),
    })
    .refine((data) => data.password === data.passwordRepeat, {
        message: "Паролі не збігаються",
        path: ["passwordRepeat"],
    });

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;
