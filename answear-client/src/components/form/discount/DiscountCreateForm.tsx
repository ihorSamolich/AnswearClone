import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Attention, Button, FileInput, Input, Label } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { DiscountCreateSchema, DiscountCreateSchemaType } from "interfaces/zod/discount.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateDiscountMutation } from "services/discount.ts";

import { useState } from "react";

const DiscountCreateForm = () => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState<string | undefined>(undefined);
    const [createDiscount, { isLoading: createDiscountIsLoading }] = useCreateDiscountMutation();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<DiscountCreateSchemaType>({ resolver: zodResolver(DiscountCreateSchema) });

    const { fields, append, remove } = useFieldArray({ control, name: "values" });

    const onSubmit = async (data: DiscountCreateSchemaType) => {
        try {
            const stringValues = data.values.map((value) => value.percent.toString());
            await createDiscount({ ...data, mediaFile: data.mediaFile[0], values: stringValues }).unwrap();
            navigate("/admin/discounts/list");
            toast.success("Знижка успішно створена!", toastOptions);
        } catch (error) {
            toast.error("Помилка під час створення знижки!", toastOptions);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
            <div>
                <Label htmlFor="name">Назва знижки*</Label>
                <Input placeholder="наприклад: Супер знижка" type="text" id="name" {...register("name")} />
                {errors.name && <Attention>{errors.name.message}</Attention>}
            </div>

            <div>
                <Label htmlFor="mediaFile">Файл медіа (JPEG, PNG, MP4)*</Label>
                <FileInput {...register("mediaFile")} previewImage={preview} setPreviewImage={setPreview} />
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
                    {createDiscountIsLoading ? <IconLoader2 className="animate-spin" /> : "Створити знижку"}
                </Button>
            </div>
        </form>
    );
};

export default DiscountCreateForm;
