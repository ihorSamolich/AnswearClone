import DiscountEditForm from "components/form/discount/DiscountEditForm.tsx";
import { PageTitle } from "components/ui";
import { useParams } from "react-router-dom";
import { useGetDiscountByIdQuery } from "services/discount.ts";

const DiscountEditPage = () => {
    const { id } = useParams();

    const { data: discount } = useGetDiscountByIdQuery(Number(id));

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Редагувати знижку" description="Всі знижки. Оберіть для редагування або видалення!" />
            {discount && <DiscountEditForm discount={discount} />}
        </div>
    );
};

export default DiscountEditPage;
