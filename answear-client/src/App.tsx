import AdminLayout from "components/layouts/AdminLayout.tsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage.tsx";
import LoginPage from "pages/SignInPage.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<HomePage/>} />

          <Route path="auth">
              <Route path="sign-in" index element={<LoginPage/>} />
          </Route>

      </Route>
    </Routes>
  );
};

export default App;
