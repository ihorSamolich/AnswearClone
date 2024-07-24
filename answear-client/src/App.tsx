import AdminLayout from "components/layouts/AdminLayout.tsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<h1>Home</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
