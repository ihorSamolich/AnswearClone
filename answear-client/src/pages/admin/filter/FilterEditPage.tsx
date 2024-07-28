import FilterEditForm from "components/form/filter/FilterEditForm.tsx";
import { PageTitle } from "components/ui";
import { useParams } from "react-router-dom";
import { useGetFilterByIdQuery } from "services/filter.ts";

const FilterEditPage = () => {
    const { id } = useParams();
    const { data: filter } = useGetFilterByIdQuery(Number(id));

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Редагувати фільтр" description="Всі фільтри. Оберіть для редагування або видалення!" />
            {filter && <FilterEditForm filter={filter} />}
        </div>
    );
};

export default FilterEditPage;
