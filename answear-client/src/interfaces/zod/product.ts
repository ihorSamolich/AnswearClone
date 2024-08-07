import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "constants/index.ts";
import { z } from "zod";

const ProductVariationValueSchema = z.object({
    shortDescription: z
        .string({ message: "Короткий опис варіації обов'язковий" })
        .min(1, { message: "Короткий опис варіації обов'язковий" })
        .max(255, { message: "Короткий опис варіації не може перевищувати 255 символів" }),

    price: z.preprocess(
        (val) => {
            if (typeof val === "string" && !isNaN(Number(val)) && val.trim() !== "") {
                return Number(val);
            }
            return val;
        },
        z.number({ message: "Ціна варіації обов'язкова" }).positive("Значення повинні бути більше 0"),
    ),

    discountValueId: z.string().optional(),

    photos: z
        .any()
        .transform((files) => (files ? Array.from(files) : []))
        .refine((files: any[]) => files.length > 0, `Min photo count is 1.`)
        .refine((files: any[]) => files.length <= 5, `Max photo count is 5.`)
        .refine(
            (files: any[]) => files.length === 0 || files.every((file) => file.size <= MAX_FILE_SIZE),
            `Max file size is 5MB.`,
        )
        .refine(
            (files: any[]) => files.length === 0 || files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
            "Only .jpg, .jpeg, .png and .webp files are accepted.",
        ),
});
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
    filters: z
        .array(z.number().positive())
        .optional()
        .refine((filters) => filters === undefined || filters.every((filter) => typeof filter === "number" && filter > 0), {
            message: "Фільтри повинні бути масивом позитивних чисел",
        }),
    variations: z
        .array(ProductVariationValueSchema)
        .optional()
        .refine((variations) => variations === undefined || variations.length > 0, {
            message: "Принаймні одна варіація повинна бути присутня",
        }),
});
export type ProductCreateSchemaType = z.infer<typeof ProductCreateSchema>;
