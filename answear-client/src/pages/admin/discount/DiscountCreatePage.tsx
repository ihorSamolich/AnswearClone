
import { PageTitle } from "components/ui";

import React from "react";
import DiscountCreateForm from "components/form/discount/DiscountCreateForm.tsx";

const CategoryCreatePage: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Створити знижку" description="Всі знижки. Оберіть для редагування або видалення!" />
            <DiscountCreateForm />
        </div>
    );
};

export default CategoryCreatePage;
