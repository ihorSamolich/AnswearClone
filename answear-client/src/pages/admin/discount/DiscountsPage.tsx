import {IconCirclePlus} from "@tabler/icons-react";
import {Button} from "components/ui";
import PageTitle from "components/ui/PageTitle.tsx";
import {Link} from "react-router-dom";


import React from "react";
import {useGetDiscountsQuery} from "services/discount.ts";
import DiscountsTable from "components/partials/discount/DiscountsTable.tsx";

const DiscountsPage: React.FC = () => {
    const {data: discounts} = useGetDiscountsQuery();
    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Список знижок" description="Всі знижки. Оберіть для редагування або видалення!"/>
            <div className="flex justify-end">
                <Link to="/admin/discounts/create">
                    <Button variant="default" size="auto">
                        <IconCirclePlus/>
                        Додати нову знижку
                    </Button>
                </Link>
            </div>

            <DiscountsTable discounts={discounts} />
        </div>
    );
};

export default DiscountsPage;
