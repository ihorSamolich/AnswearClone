import { z } from "zod";

const DiscountPercentSchema = z.object({
    percent: z.preprocess(
        (val) => {
            if (typeof val === "string" && !isNaN(Number(val)) && val.trim() !== "") {
                return Number(val);
            }
            return val;
        },
        z
            .number({ message: "Значення повинні бути цілими числами" })
            .int("Значення повинні бути цілими числами")
            .positive("Значення повинні бути більше 0")
            .refine((val) => !isNaN(val) && val > 0, {
                message: "Значення повинні бути більше 0",
            }),
    ),
});

export const DiscountCreateSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Назва знижки обов'язкова" })
        .max(255, { message: "Назва знижки не може перевищувати 255 символів" }),

    mediaFile: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "Файл медіа обов'язковий")
        .refine((files) => {
            try {
                const file = files[0];
                const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
                return allowedTypes.includes(file.type);
            } catch (e) {
                return false;
            }
        }, "Допустимі формати файлів: JPEG, PNG, MP4"),

    values: z
        .array(DiscountPercentSchema)
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
                const valuePercents = values.map((value) => value.percent);
                const uniqueValuePercents = new Set(valuePercents);
                return valuePercents.length === uniqueValuePercents.size;
            },
            {
                message: "Значення не повинні дублюватися",
            },
        ),
});
export type DiscountCreateSchemaType = z.infer<typeof DiscountCreateSchema>;

export const DiscountEditSchema = z.object({
    id: z.string(),
    name: z
        .string()
        .min(1, { message: "Назва знижки обов'язкова" })
        .max(255, { message: "Назва знижки не може перевищувати 255 символів" }),

    mediaFile: z.instanceof(FileList).refine((files) => {
        try {
            if (files.length === 0) return true;

            const file = files[0];
            const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
            return allowedTypes.includes(file.type);
        } catch (e) {
            return false;
        }
    }, "Допустимі формати файлів: JPEG, PNG, MP4"),

    values: z
        .array(DiscountPercentSchema)
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
                const valuePercents = values.map((value) => value.percent);
                const uniqueValuePercents = new Set(valuePercents);
                return valuePercents.length === uniqueValuePercents.size;
            },
            {
                message: "Значення не повинні дублюватися",
            },
        ),
});

export type DiscountEditSchemaType = z.infer<typeof DiscountEditSchema>;
