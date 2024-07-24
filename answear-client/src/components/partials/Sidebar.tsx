import { IconBrandShopee, IconCherry, IconHome, IconPizza, IconTruckDelivery, IconUserScan } from "@tabler/icons-react";
import logo from "assets/ans-icon-144x144.png";
import SidebarChevronDown from "components/partials/sidebar/SidebarChevronDown.tsx";
import SidebarExpandCollapseButton from "components/partials/sidebar/SidebarExpandCollapseButton.tsx";
import SidebarLink from "components/partials/sidebar/SidebarLink.tsx";
import SidebarLinkGroup from "components/partials/sidebar/SidebarLinkGroup.tsx";
import SidebarLinkGroupMenu from "components/partials/sidebar/SidebarLinkGroupMenu.tsx";
import SidebarLinkGroupTitle from "components/partials/sidebar/SidebarLinkGroupTitle.tsx";
import { NavLink, useLocation } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const location = useLocation();
  const { pathname } = location;

  const { sidebarOpen, setSidebarOpen } = props;

  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(event.target as Node) || trigger.current.contains(event.target as Node))
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Store sidebar expanded state in localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.body.classList.add("sidebar-expanded");
    } else {
      document.body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex flex-col justify-between mb-10 pr-3 sm:px-2 gap-5">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          {/* Logo */}
          <NavLink end to="/" className={`block text-slate-200 truncate transition duration-150 "}`}>
            <div className="flex items-center">
              <img src={logo} alt="logo" className="w-8 h-8 object-cover rounded-md" />
              <span className="text-xl font-bold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">Dashboard</span>
            </div>
          </NavLink>

          {/* Links */}
          <div className="space-y-8 -mx-2">
            {/* Pages group */}
            <div>
              <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Сторінки</span>
              </h3>
              <ul className="mt-3">
                {/* Головна */}
                <SidebarLink to="/" icon={IconHome} label="Головна" activeCondition={(pathname) => pathname === "/"} />

                {/* Категорії */}
                <SidebarLinkGroup activecondition={pathname.includes("categories")}>
                  {(handleClick, open) => (
                    <>
                      <SidebarLinkGroupTitle
                        href="#"
                        icon={IconBrandShopee}
                        isActive={pathname.includes("categories")}
                        handleClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        Категорії
                        <SidebarChevronDown open={open} />
                      </SidebarLinkGroupTitle>
                      <SidebarLinkGroupMenu
                        open={open}
                        links={[
                          { to: "/categories/list", label: "Список" },
                          { to: "/categories/create", label: "Створити" },
                        ]}
                      />
                    </>
                  )}
                </SidebarLinkGroup>

                {/*/!* Pizzas *!/*/}
                <SidebarLinkGroup activecondition={pathname.includes("pizzas")}>
                  {(handleClick, open) => (
                    <>
                      <SidebarLinkGroupTitle
                        href="#"
                        icon={IconPizza}
                        isActive={pathname.includes("pizzas")}
                        handleClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        Pizzas
                        <SidebarChevronDown open={open} />
                      </SidebarLinkGroupTitle>
                      <SidebarLinkGroupMenu open={open} links={[{ to: "/pizzas/List", label: "List" }]} />
                      <SidebarLinkGroupMenu open={open} links={[{ to: "/pizzas/create", label: "Create" }]} />
                    </>
                  )}
                </SidebarLinkGroup>

                {/*/!* Tasks *!/*/}
                <SidebarLinkGroup activecondition={pathname.includes("ingredients")}>
                  {(handleClick, open) => (
                    <>
                      <SidebarLinkGroupTitle
                        href="#"
                        icon={IconCherry}
                        isActive={pathname.includes("ingredients")}
                        handleClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        Ingredients
                        <SidebarChevronDown open={open} />
                      </SidebarLinkGroupTitle>
                      <SidebarLinkGroupMenu open={open} links={[{ to: "/ingredients/list", label: "List" }]} />
                      <SidebarLinkGroupMenu open={open} links={[{ to: "/ingredients/create", label: "Create" }]} />
                    </>
                  )}
                </SidebarLinkGroup>

                {/*/!* Orders *!/*/}
                <SidebarLinkGroup activecondition={pathname.includes("orders")}>
                  {(handleClick, open) => (
                    <>
                      <SidebarLinkGroupTitle
                        href="#"
                        icon={IconTruckDelivery}
                        isActive={pathname.includes("orders")}
                        handleClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        Orders
                        <SidebarChevronDown open={open} />
                      </SidebarLinkGroupTitle>
                      <SidebarLinkGroupMenu open={open} links={[{ to: "/orders/list", label: "List" }]} />
                    </>
                  )}
                </SidebarLinkGroup>
              </ul>
            </div>

            {/* More group */}
            <div>
              <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">More</span>
              </h3>
              <ul className="mt-3">
                {/* Authentication */}
                <SidebarLinkGroup activecondition={pathname.includes("auth")}>
                  {(handleClick, open) => (
                    <>
                      <SidebarLinkGroupTitle
                        href="#"
                        icon={IconUserScan}
                        isActive={pathname.includes("auth")}
                        handleClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        Authentication
                        <SidebarChevronDown open={open} />
                      </SidebarLinkGroupTitle>
                      <SidebarLinkGroupMenu open={open} links={[{ to: "/auth/sign-in", label: "Login" }]} />
                      <SidebarLinkGroupMenu open={open} links={[{ to: "/auth/register", label: "Register" }]} />
                    </>
                  )}
                </SidebarLinkGroup>
              </ul>
            </div>
          </div>
        </div>

        {/* Expand / collapse button */}
        <SidebarExpandCollapseButton sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      </div>
    </div>
  );
};

export default Sidebar;
