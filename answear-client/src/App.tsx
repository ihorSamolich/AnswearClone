import AdminLayout from "components/layouts/AdminLayout.tsx";
import HomePage from "pages/HomePage.tsx";
import LoginPage from "pages/SignInPage.tsx";
import CategoriesPage from "pages/admin/CategoriesPage.tsx";
import CategoryCreatePage from "pages/admin/CategoryCreatePage.tsx";
import CategoryEditPage from "pages/admin/CategoryEditPage.tsx";
import FilterCreatePage from "pages/admin/FilterCreatePage.tsx";
import FiltersPage from "pages/admin/FiltersPage.tsx";
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

        <Route path="admin/filters">
          <Route path="list" element={<FiltersPage />} />
          <Route path="create" element={<FilterCreatePage />} />
        </Route>

        <Route path="auth">
          <Route path="sign-in" index element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
