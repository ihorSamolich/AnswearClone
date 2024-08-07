import ProductCreateForm from "components/form/product/ProductCreateForm.tsx";
import { PageTitle } from "components/ui";

const ProductCreatePage = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Створити товар" description="Всі товари. Оберіть для редагування або видалення!" />
            <ProductCreateForm />
        </div>
    );
};

export default ProductCreatePage;
