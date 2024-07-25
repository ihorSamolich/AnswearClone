import { z } from "zod";

export const DiscountCreateSchema = z.object({
    name: z.string().nonempty("Назва знижки обов'язкова"),
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
        .array(z.any(), { message: "Значення знижки обов'язкове" })
        .refine(
            (sizes) => {
                return sizes.length > 0;
            },
            { message: "Sizes cannot be empty" },
        )
        .refine((values) => {
            return values.every((v) => Number(v) > 0);
        }, "Значення повинні бути більше 0")
        .refine(
            (sizes) => {
                const sizeIds = sizes.map((size) => size);
                const uniqueSizeIds = new Set(sizeIds);
                return sizeIds.length === uniqueSizeIds.size;
            },
            { message: "Sizes must be unique" },
        ),

    // .array(
    //   z.object({
    //     value: z
    //       .string()
    //       .regex(/^\d+$/, "Значення повинно бути числом")
    //       .transform((val) => parseFloat(val)),
    //   }),
    // )
    // .nonempty("Потрібно додати хоча б одне значення")
    // .refine((values) => values.every((v) => v.value > 0), "Значення повинні бути більше 0"),
    // .refine((values) => {
    //   const uniqueValues = new Set(values.map((v) => v.value));
    //   return uniqueValues.size === values.length;
    // }, "Значення не повинні дублюватися"),
});

export type DiscountCreateSchemaType = z.infer<typeof DiscountCreateSchema>;
