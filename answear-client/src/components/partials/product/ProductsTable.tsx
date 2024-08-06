import { IconArrowBadgeRightFilled, IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "components/ui";
import { IProduct } from "interfaces/product";
import { useDeleteProductMutation } from "services/product.ts";

import React from "react";

interface ProductsTableProps {
    products: IProduct[] | undefined;
    // pagesAvailable: number;
    // isLoading: boolean;
}

const ProductsTable: React.FC<ProductsTableProps> = (props) => {
    const { products } = props;
    const [deleteProduct] = useDeleteProductMutation();

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
                            Опис
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Варіанти
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
                    {products?.map((product, index) => (
                        <tr key={product.id} className="bg-white border-b hover:bg-gray-50 ">
                            <td className="px-6 py-4">{++index}</td>
                            <td className="px-6 py-4">{product.name}</td>
                            <td className="px-6 py-4 max-w-[400px]">
                                <p className="line-clamp-3">{product.description}</p>
                            </td>

                            <td className="px-6 py-4">
                                {product.variations.map((variant) => (
                                    <p key={variant.id} className="inline-flex w-full">
                                        <IconArrowBadgeRightFilled className="text-green-500" />
                                        {variant.shortDescription} - {variant.price} ₴
                                    </p>
                                ))}
                            </td>

                            <td className="px-6 py-4 inline-flex text-right space-x-5">
                                <Button variant="icon" size="iconmd">
                                    <IconEdit className="text-blue-700" />
                                </Button>
                                <Button onClick={() => deleteProduct(product.id)} variant="icon" size="iconmd">
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

export default ProductsTable;
