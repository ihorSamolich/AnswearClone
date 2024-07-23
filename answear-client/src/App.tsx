import AdminLayout from "components/layouts/AdminLayout.tsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<h1 className="bg-sky-300 text-3xl font-bold underline">Hello world!</h1>} />
            </Route>
        </Routes>
    );
};

export default App;
