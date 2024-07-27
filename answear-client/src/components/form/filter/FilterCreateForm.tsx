import { Button, Input, Label } from "components/ui";
import { useGetCategoriesQuery } from "services/category.ts";

import Option from "../../ui/Option.tsx";
import Select from "../../ui/Select.tsx";

const FilterCreateForm = () => {
    const { data: categories } = useGetCategoriesQuery();

    return (
        <form className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
            <div>
                <Label htmlFor="name">Назва категорії*</Label>
                <Input placeholder="наприклад: Розмір" type="text" id="name" />
                {/*{errors.name && <Attention>{errors.name.message}</Attention>}*/}
            </div>
            <div>
                <Label htmlFor="categoryId">Цільова група*</Label>
                <Select defaultValue="" id="categoryId">
                    <Option disabled value="">
                        Виберіть категорію
                    </Option>
                    {categories?.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {`${category.name} ${category.parent ? `${category.parent.name}` : ""} (${category.targetGroup.name})`}
                        </Option>
                    ))}
                </Select>
                {/*{errors.targetGroupId && <Attention>{errors.targetGroupId.message}</Attention>}*/}
            </div>

            <div className="flex items-center justify-center">
                <Button size="full">Створити категорію</Button>
            </div>
        </form>
    );
};

export default FilterCreateForm;
