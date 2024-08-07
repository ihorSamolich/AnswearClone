import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Attention, Button, Input, Label, Option, Select } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { ICategory } from "interfaces/category";
import { CategoryEditSchema, CategoryEditSchemaType } from "interfaces/zod/category.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCategoriesQuery, useUpdateCategoryMutation } from "services/category.ts";
import { useGetTargetGroupsQuery } from "services/targetGroup.ts";

import React, { useEffect, useState } from "react";

interface CategoryEditFormProps {
    category: ICategory;
}

const CategoryEditForm: React.FC<CategoryEditFormProps> = (props) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CategoryEditSchemaType>({ resolver: zodResolver(CategoryEditSchema) });

    const navigate = useNavigate();

    const { data: targetGroups, isLoading: targetGroupIsLoading } = useGetTargetGroupsQuery();
    const { data: categories, isLoading: categoriesIsLoading } = useGetCategoriesQuery();

    const [updateCategory, { isLoading: updateIsLoading }] = useUpdateCategoryMutation();

    const [selectedParent, setSelectedParent] = useState<string>(props.category.parentId?.toString() || "");

    useEffect(() => {
        setInitialValues(props.category);
    }, [categories, targetGroups]);

    useEffect(() => {
        if (selectedParent) {
            const parentCategory = categories?.find((ctg) => ctg.id === Number(selectedParent));
            if (parentCategory) {
                setValue("targetGroupId", parentCategory.targetGroupId.toString());
            }
        }
    }, [selectedParent, categories, setValue]);

    const onSubmit = async (data: CategoryEditSchemaType) => {
        try {
            await updateCategory({ ...data, parentId: Number(data.parentId) }).unwrap();
            navigate("/admin/categories/list");
            toast.success("Категорію успішно оновлено!", toastOptions);
        } catch (error) {
            toast.error("Помилка під час оновлення категорії!", toastOptions);
        }
    };

    const setInitialValues = (category: ICategory) => {
        if (category) {
            setValue("id", category.id.toString());
            setValue("name", category.name);
            setValue("targetGroupId", category.targetGroupId.toString());
            setValue("parentId", String(category.parentId || ""));
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
                <Label htmlFor="name">Назва категорії*</Label>
                <Input placeholder="наприклад: Босоніжки або Кепки" type="text" id="name" {...register("name")} />
                {errors.name && <Attention>{errors.name.message}</Attention>}
            </div>
            <div>
                <Label htmlFor="targetGroup">Цільова група*</Label>
                <Select
                    {...register("targetGroupId")}
                    disabled={targetGroupIsLoading || !!selectedParent}
                    defaultValue=""
                    id="targetGroup"
                >
                    <Option disabled value="">
                        Виберіть цільову групу
                    </Option>
                    {targetGroups?.map((tg) => (
                        <Option key={tg.id} value={tg.id}>
                            {tg.name}
                        </Option>
                    ))}
                </Select>
                {errors.targetGroupId && <Attention>{errors.targetGroupId.message}</Attention>}
            </div>
            <div>
                <Label htmlFor="parent">Батьківська категорія</Label>
                <Select
                    disabled={categoriesIsLoading}
                    {...register("parentId")}
                    defaultValue={selectedParent}
                    id="parent"
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedParent(value);
                    }}
                >
                    <Option value="">Виберіть батьківську категорію (необов'язково)</Option>
                    {categories
                        ?.filter((ctg) => ctg.parentId === null)
                        .map((ctg) => (
                            <Option key={ctg.id} value={ctg.id}>
                                {`${ctg.name} (${ctg.targetGroup.name})`}
                            </Option>
                        ))}
                </Select>
                {errors.parentId && <Attention>{errors.parentId.message}</Attention>}
            </div>
            <div className="flex items-center justify-center">
                <Button size="full">{updateIsLoading ? <IconLoader2 className="animate-spin" /> : "Зберегти зміни"}</Button>
            </div>
        </form>
    );
};

export default CategoryEditForm;
