import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Button, Input, Label, Option, Select } from "components/ui";
import Attention from "components/ui/Attention.tsx";
import { toastOptions } from "constants/toastOptions.ts";
import { IFilter } from "interfaces/filter";
import { FilterEditSchema, FilterEditSchemaType } from "interfaces/zod/filter.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "services/category.ts";
import { useUpdateFilterMutation } from "services/filter.ts";

import { useEffect, useState } from "react";

interface FilterEditFormProps {
    filter: IFilter;
}

const FilterEditForm = ({ filter }: FilterEditFormProps) => {
    const navigate = useNavigate();
    const [updateFilter, { isLoading: isFilterUpdating }] = useUpdateFilterMutation();
    const { data: categories } = useGetCategoriesQuery();
    const [selectedCategory, setSelectedCategory] = useState<number>(filter.categoryId || 0);

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FilterEditSchemaType>({ resolver: zodResolver(FilterEditSchema) });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "values",
    });

    useEffect(() => {
        setInitialValues(filter);
    }, [categories]);

    const onSubmit = async (data: FilterEditSchemaType) => {
        try {
            const stringValues = data.values.map((value) => value.name);
            await updateFilter({ ...data, values: stringValues }).unwrap();
            navigate("/admin/filters/list");
            toast.success("Фільтр успішно редаговано!", toastOptions);
        } catch (error) {
            toast.error(`Помилка під час редагування фільтру`, toastOptions);
        }
    };

    const setInitialValues = (filter: IFilter) => {
        if (filter) {
            setValue("id", filter.id.toString());
            setValue("name", filter.name);
            setValue("categoryId", filter.categoryId);
            setValue(
                "values",
                filter.filterValues.map((filter) => ({ name: filter.name })),
            );
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
                <Input placeholder="наприклад: Розмір" type="text" id="name" {...register("name")} />
                {errors.name && <Attention>{errors.name.message}</Attention>}
            </div>

            <div>
                <Label htmlFor="categoryId">Категорія*</Label>
                <Select
                    defaultValue={selectedCategory}
                    id="categoryId"
                    {...register("categoryId")}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCategory(Number(value));
                    }}
                >
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
                <Button size="full">{isFilterUpdating ? <IconLoader2 className="animate-spin" /> : "Оновити фільтр"}</Button>
            </div>
        </form>
    );
};

export default FilterEditForm;
