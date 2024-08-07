import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Button, FileInput, Input, Label } from "components/ui";
import Attention from "components/ui/Attention.tsx";
import { toastOptions } from "constants/toastOptions.ts";
import { IDiscount } from "interfaces/discount";
import { DiscountEditSchema, DiscountEditSchemaType } from "interfaces/zod/discount.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateDiscountMutation } from "services/discount.ts";
import { API_URL } from "utils/envData.ts";

import { useState } from "react";

interface DiscountEditFormProps {
    discount: IDiscount;
}

const DiscountEditForm = ({ discount }: DiscountEditFormProps) => {
    const {
        register,
        control,
        handleSubmit,

        formState: { errors },
    } = useForm<DiscountEditSchemaType>({
        resolver: zodResolver(DiscountEditSchema),
        defaultValues: {
            id: discount.id.toString(),
            name: discount.name,
            values: discount.discountValues.map((discount) => ({ percent: discount.percentage })),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "values",
    });

    const navigate = useNavigate();
    const [updateDiscount, { isLoading: updateDiscountIsLoading }] = useUpdateDiscountMutation();
    const [preview, setPreview] = useState<string | undefined>(`${API_URL}/images/800_${discount.mediaFile}`);

    const onSubmit = async (data: DiscountEditSchemaType) => {
        try {
            const stringValues = data.values.map((value) => value.percent.toString());
            await updateDiscount({ ...data, mediaFile: data.mediaFile[0], values: stringValues }).unwrap();
            navigate("/admin/discounts/list");

            toast.success("Знижка успішно оновлена!", toastOptions);
        } catch (error) {
            toast.error("Помилка під час оновлення знижки!", toastOptions);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
            <div>
                <Label htmlFor="id">ID*</Label>
                <Input disabled type="text" id="id" {...register("id")} />
                {errors.id && <Attention>{errors.id.message}</Attention>}
            </div>
            <div>
                <Label htmlFor="name">Назва знижки*</Label>
                <Input placeholder="наприклад: Супер знижка" type="text" id="name" {...register("name")} />
                {errors.name && <Attention>{errors.name.message}</Attention>}
            </div>
            <div>
                <Label>Файл медіа (JPEG, PNG, MP4)*</Label>
                <FileInput previewImage={preview} setPreviewImage={setPreview} {...register("mediaFile")} />
                {errors.mediaFile && <Attention>{errors.mediaFile.message}</Attention>}
            </div>

            <div>
                <Label>Значення знижки*</Label>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2 mb-2">
                        <Input type="number" placeholder="наприклад: 10" {...register(`values.${index}.percent`)} />
                        {errors.values?.[index]?.percent && <Attention>{errors.values[index]?.percent?.message}</Attention>}
                        <Button type="button" onClick={() => remove(index)}>
                            -
                        </Button>
                    </div>
                ))}
                <Button type="button" onClick={() => append({ percent: 0 })}>
                    Додати значення
                </Button>
                {errors.values && <Attention>{errors.values.message}</Attention>}
                {errors.values?.root && <Attention>{errors.values.root.message}</Attention>}
            </div>

            <div className="flex items-center justify-center">
                <Button size="full">
                    {updateDiscountIsLoading ? <IconLoader2 className="animate-spin" /> : "Оновити знижку"}
                </Button>
            </div>
        </form>
    );
};

export default DiscountEditForm;
