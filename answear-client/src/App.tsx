import AdminLayout from "components/layouts/AdminLayout.tsx";
import HomePage from "pages/HomePage.tsx";
import LoginPage from "pages/SignInPage.tsx";
import CategoriesPage from "pages/admin/CategoriesPage.tsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<HomePage />} />

        <Route path="categories">
          <Route path="list" element={<CategoriesPage />} />
        </Route>

        <Route path="auth">
          <Route path="sign-in" index element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
