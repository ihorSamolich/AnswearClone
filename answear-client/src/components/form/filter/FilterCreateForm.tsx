import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Attention, Button, Input, Label, Option, Select } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { FilterCreateSchema, FilterCreateSchemaType } from "interfaces/zod/filter.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "services/category.ts";
import { useCreateFilterMutation } from "services/filter.ts";

const FilterCreateForm = () => {
    const navigate = useNavigate();
    const { data: categories } = useGetCategoriesQuery();

    const [createFilter, { isLoading: createFilterIsLoading }] = useCreateFilterMutation();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FilterCreateSchemaType>({ resolver: zodResolver(FilterCreateSchema) });

    const { fields, append, remove } = useFieldArray({ control, name: "values" });

    const onSubmit = async (data: FilterCreateSchemaType) => {
        try {
            const stringValues = data.values.map((value) => value.name);
            await createFilter({ ...data, values: stringValues }).unwrap();
            navigate("/admin/filters/List");
            toast.success("Фільтр успішно створено", toastOptions);
        } catch (error) {
            toast.error(`Помилка під час створення фільтру`, toastOptions);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
            <div>
                <Label htmlFor="name">Назва категорії*</Label>
                <Input placeholder="наприклад: Розмір" type="text" id="name" {...register("name")} />
                {errors.name && <Attention>{errors.name.message}</Attention>}
            </div>
            <div>
                <Label htmlFor="categoryId">Категорія*</Label>
                <Select defaultValue="" id="categoryId" {...register("categoryId")}>
                    <Option disabled value="">
                        Виберіть категорію
                    </Option>
                    {categories?.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {`${category.name} ${category.parent ? `${category.parent.name}` : ""} (${category.targetGroup.name})`}
                        </Option>
                    ))}
                </Select>
                {errors.categoryId && <Attention>{errors.categoryId.message}</Attention>}
            </div>

            <div>
                <Label>Значення фільтру*</Label>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2 mb-2">
                        <Input placeholder="наприклад: XXL" {...register(`values.${index}.name`)} />
                        {errors.values?.[index]?.name && <Attention>{errors.values[index]?.name?.message}</Attention>}
                        <Button type="button" onClick={() => remove(index)}>
                            -
                        </Button>
                    </div>
                ))}
                <Button type="button" onClick={() => append({ name: "" })}>
                    Додати значення
                </Button>
                {errors.values && <Attention>{errors.values.message}</Attention>}
                {errors.values?.root && <Attention>{errors.values.root.message}</Attention>}
            </div>

            <div className="flex items-center justify-center">
                <Button size="full">{createFilterIsLoading ? <IconLoader2 className="animate-spin" /> : "Додати фільтр"}</Button>
            </div>
        </form>
    );
};

export default FilterCreateForm;
