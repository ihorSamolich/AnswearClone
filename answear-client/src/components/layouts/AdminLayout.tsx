import { Outlet } from "react-router-dom";

import { useState } from "react";

import Header from "../partial/Header.tsx";
import Sidebar from "../partial/Sidebar.tsx";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden custom-scrollbar">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 overflow-y-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
