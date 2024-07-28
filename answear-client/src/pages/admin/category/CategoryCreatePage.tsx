import CategoryCreateForm from "components/form/category/CategoryCreateForm.tsx";
import { PageTitle } from "components/ui";

import React from "react";

const CategoryCreatePage: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Створити категорію" description="Всі категорії. Оберіть для редагування або видалення!" />
            <CategoryCreateForm />
        </div>
    );
};

export default CategoryCreatePage;
