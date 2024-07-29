import UsersTable from "components/partials/user/UsersTable.tsx";
import PageTitle from "components/ui/PageTitle.tsx";
import { useGetUsersQuery } from "services/user.ts";

import React from "react";

const UsersPage: React.FC = () => {
    const { data: users } = useGetUsersQuery();

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Список користувачів" description="Всі користувачі. Оберіть для керування!" />
            {users && <UsersTable users={users} />}
        </div>
    );
};

export default UsersPage;
