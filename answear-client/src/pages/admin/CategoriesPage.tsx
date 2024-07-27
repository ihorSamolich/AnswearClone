import {IconCirclePlus} from "@tabler/icons-react";
import CategoriesTable from "components/partials/category/CategoriesTable.tsx";
import {Button} from "components/ui";
import PageTitle from "components/ui/PageTitle.tsx";
import {Link} from "react-router-dom";
import {useGetCategoriesQuery} from "services/category.ts";

import React from "react";

const CategoriesPage: React.FC = () => {
    const {data: categories} = useGetCategoriesQuery();
  
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Список категорій" description="Всі категорії. Оберіть для редагування або видалення!" />
      <div className="flex justify-end">
        <Link to="/admin/categories/create">
          <Button variant="default" size="auto">
            <IconCirclePlus />
            Додати нову категорію
          </Button>
        </Link>
      </div>
      {categories && <CategoriesTable categories={categories} />}
    </div>
  );
 };

export default CategoriesPage;
