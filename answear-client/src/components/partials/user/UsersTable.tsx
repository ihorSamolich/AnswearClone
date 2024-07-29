import { IconCircleDashedCheck, IconLock } from "@tabler/icons-react";
import { Button } from "components/ui";
import { IUser } from "interfaces/user";
import { useLockUserMutation } from "services/user.ts";
import { formatDate } from "utils/formatDate.ts";
import { isUserLockedOut } from "utils/isUserLockedOut.ts";

import React from "react";

interface UsersTableProps {
    users: IUser[] | undefined;
    // pagesAvailable: number;
    // isLoading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = (props) => {
    const { users } = props;
    const [lockUser] = useLockUserMutation();
    // const { pagesAvailable, isLoading } = props;
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
                            Заблоковано до
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Кнопки</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr
                            key={user.id}
                            className={`${isUserLockedOut(user.lockoutEnd) ? "bg-red-200 hover:bg-red-300" : "bg-white hover:bg-gray-50"}  border-b hover:bg-gray-50 `}
                        >
                            <td className="px-6 py-4">{++index}</td>
                            <td className="px-6 py-4">{user.firstName}</td>
                            <td className="px-6 py-4">{user.lastName}</td>
                            <td className="px-6 py-4">{user.userName}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.phoneNumber ? user.phoneNumber : "Не вказано"}</td>
                            <td className="px-6 py-4">{user.emailVerified ? "Підтверджено" : "Не підтверджено"}</td>
                            <td className="px-6 py-4">
                                {isUserLockedOut(user.lockoutEnd) ? (
                                    formatDate(user.lockoutEnd)
                                ) : (
                                    <IconCircleDashedCheck className="text-green-500" />
                                )}
                            </td>
                            <td className="px-6 py-4 inline-flex text-right space-x-5">
                                {!user.lockoutEnd && !isUserLockedOut(user.lockoutEnd) && (
                                    <Button onClick={() => lockUser(user.id)} variant="icon" size="iconmd">
                                        <IconLock className="text-red-500" />
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
