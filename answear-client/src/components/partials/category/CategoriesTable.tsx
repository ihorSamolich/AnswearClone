import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "components/ui";
import { ICategory } from "interfaces/category";
import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation } from "services/category.ts";

import React from "react";

interface CategoriesTableProps {
    categories: ICategory[] | undefined;
    // pagesAvailable: number;
    // isLoading: boolean;
}

const CategoriesTable: React.FC<CategoriesTableProps> = (props) => {
    const navigate = useNavigate();

    const { categories } = props;
    const [deleteCategory] = useDeleteCategoryMutation();

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
                            Відділ
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
                            <td className="px-6 py-4"> {category.parent?.name}</td>
                            <td className="px-6 py-4 text-right space-x-5">
                                <Button
                                    onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                                    variant="icon"
                                    size="iconmd"
                                >
                                    <IconEdit className="text-blue-700" />
                                </Button>
                                <Button onClick={() => deleteCategory(category.id)} variant="icon" size="iconmd">
                                    <IconTrash className="text-red-500" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesTable;
