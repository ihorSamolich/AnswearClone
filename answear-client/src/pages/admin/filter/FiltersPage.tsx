import { IconCirclePlus } from "@tabler/icons-react";
import FiltersTable from "components/partials/filter/FiltersTable.tsx";
import { Button, PageTitle } from "components/ui";
import { Link } from "react-router-dom";
import { useGetFiltersQuery } from "services/filter.ts";

const FiltersPage = () => {
    const { data: filters } = useGetFiltersQuery();

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Список фільтрів" description="Всі фільтрів. Оберіть для редагування або видалення!" />
            <div className="flex justify-end">
                <Link to="/admin/filters/create">
                    <Button variant="default" size="auto">
                        <IconCirclePlus />
                        Додати фільтр
                    </Button>
                </Link>
            </div>

            <FiltersTable filters={filters} />
        </div>
    );
};

export default FiltersPage;
