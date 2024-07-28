import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "components/ui";
import { IFilter } from "interfaces/filter";
import { useNavigate } from "react-router-dom";
import { useDeleteFilterMutation } from "services/filter.ts";

import React from "react";

interface FiltersTableProps {
    filters: IFilter[] | undefined;
    // pagesAvailable: number;
    // isLoading: boolean;
}

const FiltersTable: React.FC<FiltersTableProps> = (props) => {
    const { filters } = props;
    const navigate = useNavigate();

    const [deleteFilter] = useDeleteFilterMutation();

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
                            Категорія
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Фільтри
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
                    {filters?.map((filter, index) => (
                        <tr key={filter.id} className="bg-white border-b hover:bg-gray-50 ">
                            <td className="px-6 py-4">{++index}</td>
                            <td className="px-6 py-4">{filter.name}</td>
                            <td className="px-6 py-4">{filter.category.name}</td>

                            <td className="px-6 py-4">
                                {filter.filterValues.map((filterValue) => filterValue.name).join(" | ")}
                            </td>

                            <td className="px-6 py-4 inline-flex text-right space-x-5">
                                <Button onClick={() => navigate(`/admin/filters/edit/${filter.id}`)} variant="icon" size="iconmd">
                                    <IconEdit className="text-blue-700" />
                                </Button>
                                <Button onClick={() => deleteFilter(filter.id)} variant="icon" size="iconmd">
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

export default FiltersTable;
