import AdminLayout from "components/layouts/AdminLayout.tsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<HomePage/>} />
      </Route>
    </Routes>
  );
};

export default App;
