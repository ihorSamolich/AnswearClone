import Header from "components/partials/Header.tsx";
import Sidebar from "components/partials/Sidebar.tsx";
import { Outlet } from "react-router-dom";

import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden custom-scrollbar">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl h-full mx-auto scrollbar overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
