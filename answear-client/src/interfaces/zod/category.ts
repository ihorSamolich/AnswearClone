import { z } from "zod";

export const CategoryCreateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Мінімальна кількість символів 3" })
    .max(100, { message: "Максимальна кількість символів 100" }),

  targetGroupId: z
    .string({ message: "Виберіть цільову групу" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
      message: "Виберіть цільову групу",
    }),

  parentId: z.string().optional(),
});

export type CategoryCreateSchemaType = z.infer<typeof CategoryCreateSchema>;

export const CategoryEditSchema = z.object({
  id: z.string(),

  name: z
    .string()
    .min(3, { message: "Мінімальна кількість символів 3" })
    .max(100, { message: "Максимальна кількість символів 100" }),

  targetGroupId: z
    .string({ message: "Виберіть цільову групу" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0, {
      message: "Виберіть цільову групу",
    }),

  parentId: z.string().optional(),
});

export type CategoryEditSchemaType = z.infer<typeof CategoryEditSchema>;
