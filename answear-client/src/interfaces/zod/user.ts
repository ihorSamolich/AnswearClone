import { z } from "zod";

export const UserLoginSchema = z.object({
    email: z.string().email({ message: "Неправильний формат електронної пошти" }),
    password: z.string().min(6, { message: "Пароль має містити не менше 6 символів" }),
});

export type UserLoginSchemaType = z.infer<typeof UserLoginSchema>;
