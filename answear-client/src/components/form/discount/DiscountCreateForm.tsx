import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Button, Input, Label } from "components/ui";
import Attention from "components/ui/Attention.tsx";
import { ICreateDiscount } from "interfaces/discount";
import { DiscountCreateSchema, DiscountCreateSchemaType } from "interfaces/zod/discount.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateDiscountMutation } from "services/discount.ts";

const DiscountCreateForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateDiscount>({ resolver: zodResolver(DiscountCreateSchema) });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "values",
    });

    const navigate = useNavigate();
    const [createDiscount, { isLoading: createDiscountIsLoading }] = useCreateDiscountMutation();

    const onSubmit = async (data: DiscountCreateSchemaType) => {
        try {
            console.log(" on submit", data);
            // const formattedValues = data.values.map((v) => ({ value: v.value }));
            // await createDiscount({ ...data, values: formattedValues, mediaFile: data.mediaFile[0] }).unwrap();
            // navigate("/admin/discounts/list");
        } catch (error) {
            console.error("Error creating discount: ", error);
        }
    };

    console.log(errors);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8"
            encType="multipart/form-data"
        >
            <div>
                <Label htmlFor="name">Назва знижки*</Label>
                <Input placeholder="наприклад: Супер знижка" type="text" id="name" {...register("name")} />
                {errors.name && <Attention>{errors.name.message}</Attention>}
            </div>
            <div>
                <Label htmlFor="mediaFile">Файл медіа (JPEG, PNG, MP4)*</Label>
                <Input type="file" id="mediaFile" {...register("mediaFile")} />
                {errors.mediaFile && <Attention>{errors.mediaFile.message}</Attention>}
            </div>
            <div>
                <Label>Значення знижки*</Label>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2 mb-2">
                        <Input type="number" placeholder="наприклад: 10" {...register(`values.${index}`)} />
                        {errors.values?.[index] && <Attention>{errors.values?.[index]?.message}</Attention>}
                        <Button type="button" onClick={() => remove(index)}>
                            -
                        </Button>
                    </div>
                ))}
                <Button type="button" onClick={() => append({ value: 0 })}>
                    Додати значення
                </Button>
                {errors.values?.root && <Attention>{errors.values.root?.message}</Attention>}
                {errors.values && <Attention>{errors.values.message}</Attention>}
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
