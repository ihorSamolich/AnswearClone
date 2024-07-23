import { IconMenu2 } from "@tabler/icons-react";

import React from "react";

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    const { sidebarOpen, setSidebarOpen } = props;
    //const [searchModalOpen, setSearchModalOpen] = useState(false);

    return (
        <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-10">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                        {/* Hamburger button */}
                        <button
                            className="text-slate-500 hover:text-slate-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(!sidebarOpen);
                            }}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <IconMenu2 className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>

                    {/* Header: Right side */}
                    {<div className="flex items-center space-x-3"></div>}
                </div>
            </div>
        </header>
    );
};

export default Header;
