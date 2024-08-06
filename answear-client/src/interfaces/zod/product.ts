import { z } from "zod";

export const ProductCreateSchema = z.object({
    name: z
        .string({ message: "Назва товару обов'язкова" })
        .min(1, { message: "Назва товару обов'язкова" })
        .max(255, { message: "Назва товару не може перевищувати 100 символів" }),

    description: z
        .string({ message: "Опис товару обов'язкова" })
        .min(1, { message: "Опис товару обов'язкова" })
        .max(500, { message: "Опис товару не може перевищувати 500 символів" }),

    categoryId: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : 0),
        z.number().refine((val) => !isNaN(val) && val > 0, {
            message: "Оберіть категорію",
        }),
    ),
});
export type ProductCreateSchemaType = z.infer<typeof ProductCreateSchema>;
