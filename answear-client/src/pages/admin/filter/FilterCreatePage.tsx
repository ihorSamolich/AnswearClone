import FilterCreateForm from "components/form/filter/FilterCreateForm.tsx";
import { PageTitle } from "components/ui";

const FilterCreatePage = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Створити фільтр" description="Всі фільтри. Оберіть для редагування або видалення!" />
            <FilterCreateForm />
        </div>
    );
};

export default FilterCreatePage;
