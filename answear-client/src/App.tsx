import { Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <h1 className="bg-sky-300 text-3xl font-bold underline">Hello world!</h1>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;
