import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { Attention, Button, Input, Label, Option, Select } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { IProductCreateVariation } from "interfaces/product";
import { ProductCreateSchema, ProductCreateSchemaType } from "interfaces/zod/product.ts";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "services/category.ts";
import { useCreateProductMutation } from "services/product.ts";

const ProductCreateForm = () => {
    const { data: categories } = useGetCategoriesQuery();
    const [createProduct, { isLoading: createProductIsLoading }] = useCreateProductMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductCreateSchemaType>({ resolver: zodResolver(ProductCreateSchema) });

    const onSubmit = async (data: ProductCreateSchemaType) => {
        try {
            const variants: IProductCreateVariation[] = [
                {
                    shortDescription: "кофта",
                    price: 1032,
                },
                {
                    shortDescription: "сведра",
                    price: 120,
                },
            ];

            await createProduct({ ...data, variations: variants }).unwrap();
            toast.success("Товар успішно створено", toastOptions);
        } catch (error) {
            toast.error(`Помилка під час створення товару`, toastOptions);
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

            <div className="flex items-center justify-center">
                <Button size="full">{createProductIsLoading ? <IconLoader2 className="animate-spin" /> : "Додати товар"}</Button>
            </div>
        </form>
    );
};

export default ProductCreateForm;
