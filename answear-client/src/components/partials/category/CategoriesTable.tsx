import { Button } from "components/ui";
import { ICategory } from "interfaces/category";

import React from "react";

interface CategoriesTableProps {
  categories: ICategory[] | undefined;
  // pagesAvailable: number;
  // isLoading: boolean;
}

const CategoriesTable: React.FC<CategoriesTableProps> = (props) => {
  const { categories } = props;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm font-bold text-left text-black">
        <thead className="text-xs text-black uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Назва
            </th>
            <th scope="col" className="px-6 py-3">
              Група
            </th>
            <th scope="col" className="px-6 py-3">
              Підкатегорія
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Кнопки</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Loading skeleton */}
          {/*{isLoading && <TableCategoriesSkeleton />}*/}

          {/* Loaded data */}
          {categories?.map((category, index) => (
            <tr key={category.id} className="bg-white border-b hover:bg-gray-50 ">
              <td className="px-6 py-4">{++index}</td>
              <td className="px-6 py-4">{category.name}</td>
              <td className="px-6 py-4">{category.targetGroup.name}</td>

              <td className="px-6 py-4"> {category.childrens.length ? "-" : "+"}</td>

              <td className="px-6 py-4 text-right space-x-5">
                <Button> Редагувати</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
