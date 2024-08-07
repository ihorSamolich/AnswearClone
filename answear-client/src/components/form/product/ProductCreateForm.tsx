import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Attention, Button, Input, Label, Option, Select } from "components/ui";
import CheckBox from "components/ui/CheckBox.tsx";
import FileInputMultiple from "components/ui/FileInputMultiple.tsx";
import { toastOptions } from "constants/toastOptions.ts";
import { ProductCreateSchema, ProductCreateSchemaType } from "interfaces/zod/product.ts";
import { UseFormGetValues, UseFormSetValue, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "services/category.ts";
import { useGetDiscountsQuery } from "services/discount.ts";
import { useGetFiltersQuery } from "services/filter.ts";
import { useCreateProductMutation } from "services/product.ts";

import React, { useState } from "react";

const ProductCreateForm = () => {
    const { data: categories } = useGetCategoriesQuery();
    const { data: discounts } = useGetDiscountsQuery();
    const { data: filters } = useGetFiltersQuery();

    const [photos, setPhotos] = useState<File[]>([]);

    const [createProduct, { isLoading: createProductIsLoading }] = useCreateProductMutation();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<ProductCreateSchemaType>({ resolver: zodResolver(ProductCreateSchema) });

    const { fields, append, remove } = useFieldArray({ control, name: "variations" });

    const onSubmit = async (data: ProductCreateSchemaType) => {
        try {
            console.log(data);

            // @ts-ignore
            await createProduct(data).unwrap();
            toast.success("Товар успішно створено", toastOptions);
        } catch (error) {
            toast.error(`Помилка під час створення товару`, toastOptions);
        }
    };

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setValue: UseFormSetValue<ProductCreateSchemaType>,
        getValues: UseFormGetValues<ProductCreateSchemaType>,
    ) => {
        const { value, checked } = event.target;
        const currentValues = getValues("filters") || [];

        if (checked) {
            setValue("filters", [...currentValues, parseInt(value)], {
                shouldValidate: true,
            });
        } else {
            setValue(
                "filters",
                currentValues.filter((val) => val !== parseInt(value)),
                {
                    shouldValidate: true,
                },
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
            <div>
                <Label htmlFor="name">Назва товару*</Label>
                <Input placeholder="наприклад: Джинси BOSS" type="text" id="name" {...register("name")} />
                {errors.name && <Attention>{errors.name.message}</Attention>}
            </div>
            <div>
                <Label htmlFor="description">Опис товару*</Label>
                <Input
                    placeholder="наприклад: Джинси із колекції BOSS фасону..."
                    type="text"
                    id="description"
                    {...register("description")}
                />
                {errors.description && <Attention>{errors.description.message}</Attention>}
            </div>

            <div>
                <Label htmlFor="categoryId">Категорія*</Label>
                <Select defaultValue="" id="categoryId" {...register("categoryId")}>
                    <Option disabled value="">
                        Виберіть категорію
                    </Option>
                    {categories?.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {`${category.name} ${category.parent ? `- ${category.parent.name}` : ""} (${category.targetGroup.name})`}
                        </Option>
                    ))}
                </Select>
                {errors.categoryId && <Attention>{errors.categoryId.message}</Attention>}
            </div>

            {/*             */}
            <div>
                <Label>Фільтри</Label>
                <div className="w-full p-4 my-2  border border-[#dbdce0]">
                    {filters?.map((filter) => (
                        <div key={filter.id} className="inline-flex items-center gap-1 me-4">
                            <CheckBox
                                key={filter.id}
                                id={`filter-${filter.id}`}
                                value={filter.id}
                                checked={getValues("filters")?.includes(filter.id) || false}
                                onChange={(event) => handleCheckboxChange(event, setValue, getValues)}
                            />

                            <Label htmlFor={`filter-${filter.id}`}>{filter.name}</Label>
                        </div>
                    ))}
                </div>
                {errors.filters && <p className="mt-2 text-sm text-red-600">{errors.filters.message}</p>}
            </div>

            {/*             */}
            <div>
                <Label>Варіанти товару*</Label>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex flex-col justify-center p-4 my-2 rounded-xl border border-[#dbdce0]">
                        <div>
                            <Label>Короткий опис*</Label>
                            <Input
                                placeholder="наприклад: чоловічі колір синій"
                                {...register(`variations.${index}.shortDescription`)}
                            />
                            {errors.variations?.[index]?.shortDescription && (
                                <Attention>{errors.variations[index]?.shortDescription?.message}</Attention>
                            )}
                        </div>
                        <div>
                            <Label>Ціна (грн)*</Label>
                            <Input type="number" placeholder="наприклад: 1050" {...register(`variations.${index}.price`)} />
                            {errors.variations?.[index]?.price && (
                                <Attention>{errors.variations[index]?.price?.message}</Attention>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="discountValueId">Категорія*</Label>
                            <Select defaultValue="" id="discountValueId" {...register(`variations.${index}.discountValueId`)}>
                                <Option value="">Виберіть знижку (необов'язково)</Option>
                                {discounts?.map((discount) =>
                                    discount.discountValues?.map((discountValue) => (
                                        <Option key={discountValue.id} value={discountValue.id}>
                                            {`${discount.name} - ${discountValue.percentage}%`}
                                        </Option>
                                    )),
                                )}
                            </Select>
                            {errors.variations?.[index]?.discountValueId && (
                                <Attention>{errors.variations[index]?.discountValueId?.message}</Attention>
                            )}
                        </div>
                        <div>
                            <Label>Фото*</Label>
                            <FileInputMultiple files={photos} setFiles={setPhotos}>
                                <input {...register(`variations.${index}.photos`)} type="file" multiple />
                            </FileInputMultiple>
                        </div>

                        <Button type="button" onClick={() => remove(index)}>
                            -
                        </Button>
                    </div>
                ))}
                <Button
                    type="button"
                    onClick={() => append({ shortDescription: "", price: 100, discountValueId: "", photos: [] })}
                >
                    Додати значення
                </Button>
                {/*{errors.values && <Attention>{errors.values.message}</Attention>}*/}
                {/*{errors.values?.root && <Attention>{errors.values.root.message}</Attention>}*/}
            </div>
            {/*             */}

            <div className="flex items-center justify-center">
                <Button size="full">{createProductIsLoading ? <IconLoader2 className="animate-spin" /> : "Додати товар"}</Button>
            </div>
        </form>
    );
};

export default ProductCreateForm;
