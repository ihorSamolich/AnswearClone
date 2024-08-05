import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Button, Input, Label } from "components/ui";
import Attention from "components/ui/Attention.tsx";
import Option from "components/ui/Option.tsx";
import Select from "components/ui/Select.tsx";
import { toastOptions } from "constants/toastOptions.ts";
import { CategoryCreateSchema, CategoryCreateSchemaType } from "interfaces/zod/category.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "services/category.ts";
import { useGetTargetGroupsQuery } from "services/targetGroup.ts";

import { useEffect, useState } from "react";

const CategoryCreateForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CategoryCreateSchemaType>({ resolver: zodResolver(CategoryCreateSchema) });

    const navigate = useNavigate();

    const { data: targetGroups, isLoading: targetGroupIsLoading } = useGetTargetGroupsQuery();
    const { data: categories, isLoading: categoriesIsLoading } = useGetCategoriesQuery();
    const [createCategory, { isLoading: createCategoryIsLoading }] = useCreateCategoryMutation();

    const [selectedParent, setSelectedParent] = useState<string | null>(null);

    const onSubmit = async (data: CategoryCreateSchemaType) => {
        try {
            await createCategory({ ...data, parentId: Number(data.parentId) }).unwrap();
            navigate("/admin/categories/list");
            toast.success("Категорію успішно створено!", toastOptions);
        } catch (error) {
            toast.error("Помилка під час створення категорії!", toastOptions);
        }
    };

    useEffect(() => {
        if (selectedParent) {
            const parentCategory = categories?.find((ctg) => ctg.id === Number(selectedParent));
            if (parentCategory) {
                setValue("targetGroupId", parentCategory.targetGroupId.toString());
            }
        }
    }, [selectedParent, categories, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
            <div>
                <Label htmlFor="name">Назва категорії*</Label>
                <Input
                    className={`${errors.name} ? "focus:border-red-500" : ""`}
                    placeholder="наприклад: Босоніжки або Кепки"
                    type="text"
                    id="name"
                    {...register("name")}
                />
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
                    defaultValue=""
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
                <Button size="full">
                    {createCategoryIsLoading ? <IconLoader2 className="animate-spin" /> : "Створити категорію"}
                </Button>
            </div>
        </form>
    );
};

export default CategoryCreateForm;
