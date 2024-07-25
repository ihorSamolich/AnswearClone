import { IconCirclePlus } from "@tabler/icons-react";
import { Button, PageTitle } from "components/ui";
import { Link } from "react-router-dom";

const FiltersPage = () => {
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
    </div>
  );
};

export default FiltersPage;
