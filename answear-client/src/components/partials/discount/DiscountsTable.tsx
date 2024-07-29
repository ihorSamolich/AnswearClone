import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Button } from "components/ui";
import { IDiscount } from "interfaces/discount";
import { useNavigate } from "react-router-dom";
import { useDeleteDiscountMutation } from "services/discount.ts";
import { API_URL } from "utils/envData.ts";
import { isImageFile, isVideoFile } from "utils/fileUtils.ts";

import React from "react";

interface DiscountsTableProps {
    discounts: IDiscount[] | undefined;
}

const DiscountsTable: React.FC<DiscountsTableProps> = (props) => {
    const navigate = useNavigate();

    const { discounts } = props;
    const [deleteDiscount] = useDeleteDiscountMutation();

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
                            Файл медіа
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Відсотки знижок
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Кнопки</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {discounts?.map((discount, index) => (
                        <tr key={discount.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{++index}</td>
                            <td className="px-6 py-4">{discount.name}</td>
                            <td className="px-6 py-4">
                                {isImageFile(discount.mediaFile) ? (
                                    <img
                                        src={API_URL + `/images/800_${discount.mediaFile}`}
                                        alt={discount.name}
                                        className="h-20 w-20 object-cover"
                                    />
                                ) : isVideoFile(discount.mediaFile) ? (
                                    <video autoPlay playsInline muted loop controls className="h-20 w-20  bg-gray-500">
                                        <source src={API_URL + `/images/${discount.mediaFile}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <span>Unknown media type</span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {[...discount.discountValues]
                                    .sort((a, b) => a.percentage - b.percentage)
                                    .map((value) => `${value.percentage}%`)
                                    .join(", ")}
                            </td>
                            <td className="px-6 py-4 text-right space-x-5">
                                <Button
                                    onClick={() => navigate(`/admin/discounts/edit/${discount.id}`)}
                                    variant="icon"
                                    size="iconmd"
                                >
                                    <IconEdit className="text-blue-700" />
                                </Button>
                                <Button onClick={() => deleteDiscount(discount.id)} variant="icon" size="iconmd">
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

export default DiscountsTable;
