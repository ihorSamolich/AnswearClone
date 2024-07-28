import CategoryEditForm from "components/form/category/CategoryEditForm.tsx";
import { PageTitle } from "components/ui";
import { useParams } from "react-router-dom";
import { useGetCategoryByIdQuery } from "services/category.ts";

const CategoryEditPage = () => {
    const { id } = useParams();

    const { data: category } = useGetCategoryByIdQuery(Number(id));

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Редагувати категорію" description="Всі категорії. Оберіть для редагування або видалення!" />
            {category && <CategoryEditForm category={category} />}
        </div>
    );
};

export default CategoryEditPage;
