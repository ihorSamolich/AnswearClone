import AdminLayout from "components/layouts/AdminLayout.tsx";
import HomePage from "pages/HomePage.tsx";
import ResetPasswordPage from "pages/ResetPasswordPage.tsx";
import SignInPage from "pages/SignInPage.tsx";
import SignUpPage from "pages/SignUpPage.tsx";
import CategoriesPage from "pages/admin/category/CategoriesPage.tsx";
import CategoryCreatePage from "pages/admin/category/CategoryCreatePage.tsx";
import CategoryEditPage from "pages/admin/category/CategoryEditPage.tsx";
import DiscountCreatePage from "pages/admin/discount/DiscountCreatePage.tsx";
import DiscountEditPage from "pages/admin/discount/DiscountEditPage.tsx";
import DiscountsPage from "pages/admin/discount/DiscountsPage.tsx";
import FilterCreatePage from "pages/admin/filter/FilterCreatePage.tsx";
import FilterEditPage from "pages/admin/filter/FilterEditPage.tsx";
import FiltersPage from "pages/admin/filter/FiltersPage.tsx";
import ProductCreatePage from "pages/admin/product/ProductCreatePage.tsx";
import ProductPage from "pages/admin/product/ProductPage.tsx";
import UsersPage from "pages/admin/user/UsersPage.tsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<HomePage />} />

                <Route path="admin/categories">
                    <Route path="list" element={<CategoriesPage />} />
                    <Route path="create" element={<CategoryCreatePage />} />
                    <Route path="edit/:id" element={<CategoryEditPage />} />
                </Route>

                <Route path="admin/products">
                    <Route path="list" element={<ProductPage />} />
                    <Route path="create" element={<ProductCreatePage />} />
                </Route>

                <Route path="admin/discounts">
                    <Route path="list" element={<DiscountsPage />} />
                    <Route path="create" element={<DiscountCreatePage />} />
                    <Route path="edit/:id" element={<DiscountEditPage />} />
                </Route>
                <Route path="admin/filters">
                    <Route path="list" element={<FiltersPage />} />
                    <Route path="create" element={<FilterCreatePage />} />
                    <Route path="edit/:id" element={<FilterEditPage />} />
                </Route>
                <Route path="admin/users">
                    <Route path="list" element={<UsersPage />} />
                </Route>

                <Route path="auth">
                    <Route path="sign-in" element={<SignInPage />} />
                    <Route path="register" element={<SignUpPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
