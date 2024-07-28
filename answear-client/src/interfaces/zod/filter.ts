import { z } from "zod";

const FilterValueSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Назва значення фільтру обов'язкова" })
        .max(255, { message: "Назва значення фільтру не може перевищувати 50 символів" }),
});

export const FilterCreateSchema = z.object({
    name: z
        .string({ message: "Назва знижки обов'язкова" })
        .min(1, { message: "Назва знижки обов'язкова" })
        .max(255, { message: "Назва знижки не може перевищувати 255 символів" }),

    categoryId: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : 0),
        z.number().refine((val) => !isNaN(val) && val > 0, {
            message: "Оберіть категорію",
        }),
    ),

    values: z
        .array(FilterValueSchema)
        .refine(
            (values) => {
                return values.length > 0;
            },
            {
                message: "Додайте хоча б одне значення",
            },
        )
        .refine(
            (values) => {
                const valueName = values.map((value) => value.name);
                const uniqueValueNames = new Set(valueName);
                return valueName.length === uniqueValueNames.size;
            },
            {
                message: "Значення не повинні дублюватися",
            },
        ),
});
export type FilterCreateSchemaType = z.infer<typeof FilterCreateSchema>;

export const FilterEditSchema = z.object({
    id: z.string(),

    name: z
        .string({ message: "Назва знижки обов'язкова" })
        .min(1, { message: "Назва знижки обов'язкова" })
        .max(255, { message: "Назва знижки не може перевищувати 255 символів" }),

    categoryId: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : 0),
        z.number().refine((val) => !isNaN(val) && val > 0, {
            message: "Оберіть категорію",
        }),
    ),

    values: z
        .array(FilterValueSchema)
        .refine(
            (values) => {
                return values.length > 0;
            },
            {
                message: "Додайте хоча б одне значення",
            },
        )
        .refine(
            (values) => {
                const valueName = values.map((value) => value.name);
                const uniqueValueNames = new Set(valueName);
                return valueName.length === uniqueValueNames.size;
            },
            {
                message: "Значення не повинні дублюватися",
            },
        ),
});
export type FilterEditSchemaType = z.infer<typeof FilterEditSchema>;
