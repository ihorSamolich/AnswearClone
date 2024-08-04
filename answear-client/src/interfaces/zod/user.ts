import { z } from "zod";

export const UserLoginSchema = z.object({
    email: z.string().email({ message: "Неправильний формат електронної пошти" }),
    password: z.string().min(6, { message: "Пароль має містити не менше 6 символів" }),
});

export type UserLoginSchemaType = z.infer<typeof UserLoginSchema>;

export const UserRegisterSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" })
        .email({ message: "Неправильний формат електронної пошти" }),
    password: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" })
        .min(6, { message: "Пароль має містити не менше 6 символів" }),
    terms: z.boolean({ required_error: "Будь ласка, ознайомтеся і погодьтеся з Правилами" }).refine((value) => value, {
        message: "Будь ласка, ознайомтеся і погодьтеся з Правилами",
    }),
    newsletter: z.boolean().optional(),
});

export type UserRegisterSchemaType = z.infer<typeof UserRegisterSchema>;
