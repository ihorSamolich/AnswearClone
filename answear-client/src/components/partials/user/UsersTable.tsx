import { IconLock } from "@tabler/icons-react";
import { Button } from "components/ui";
import { IUser } from "interfaces/user";

import React from "react";

interface UsersTableProps {
    users: IUser[] | undefined;
    // pagesAvailable: number;
    // isLoading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = (props) => {
    const { users } = props;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm font-bold text-left text-black">
                <thead className="text-xs text-black uppercase bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ім'я
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Прізвище
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Нікнейм
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Пошта
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Мобільний телефон
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Підтверджена пошта
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
                    {users?.map((users, index) => (
                        <tr key={users.id} className="bg-white border-b hover:bg-gray-50 ">
                            <td className="px-6 py-4">{++index}</td>
                            <td className="px-6 py-4">{users.firstName}</td>
                            <td className="px-6 py-4">{users.lastName}</td>
                            <td className="px-6 py-4">{users.userName}</td>
                            <td className="px-6 py-4">{users.email}</td>
                            <td className="px-6 py-4">{users.phoneNumber ? users.phoneNumber : "Не вказано"}</td>
                            <td className="px-6 py-4">{users.emailVerified ? "Підтверджено" : "Не підтверджено"}</td>
                            <td className="px-6 py-4 inline-flex text-right space-x-5">
                                <Button variant="icon" size="iconmd">
                                    <IconLock className="text-red-500" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
