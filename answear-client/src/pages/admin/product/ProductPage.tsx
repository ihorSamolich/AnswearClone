import { IconCirclePlus } from "@tabler/icons-react";
import ProductsTable from "components/partials/product/ProductsTable.tsx";
import { Button, PageTitle } from "components/ui";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "services/product.ts";

const ProductPage = () => {
    const { data: products } = useGetProductsQuery();

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Список товарів" description="Всі товари. Оберіть для редагування або видалення!" />
            <div className="flex justify-end">
                <Link to="/admin/products/create">
                    <Button variant="default" size="auto">
                        <IconCirclePlus />
                        Додати нову товар
                    </Button>
                </Link>
            </div>

            <ProductsTable products={products} />
        </div>
    );
};

export default ProductPage;
