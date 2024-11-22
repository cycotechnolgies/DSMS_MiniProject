import React, { useState, useEffect, useRef } from "react";
import { Form, NavLink, useLocation } from "react-router-dom";
import {
  CarTaxiFront,
  CircleGauge,
  User,
  UserCog,
  BadgeDollarSign,
  HeartPulse,
  BookOpenCheck,
  CassetteTape,
  CalendarCheck2,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-sm"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <div className="bg-black text-white flex justify-center items-center p-2 rounded-full gap-2 dark:bg-blue-600">
              <CarTaxiFront />
              <span className="font-bold pr-2">DSMS</span>
            </div>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="mt-3">
              {/* Dashboard */}
              <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                  <li className="mb-4 last:mb-0">
                    <NavLink
                      end
                      to="/"
                      className={({ isActive }) =>
                        "block transition duration-150 truncate" +
                        (isActive
                          ? "text-white dark:text-white font-semibold dark:font-semibold bg-blue-600 px-4 py-2 rounded-full"
                          : "text-gray-500/90 dark:text-white hover:text-blue-600 dark:hover:text-blue-400")
                      }
                    >
                      <span className="text-sm flex gap-4 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        <CircleGauge /> Dashboard
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-4 last:mb-0">
                    <NavLink
                      end
                      to="/students"
                      className={({ isActive }) =>
                        "block transition duration-150 truncate" +
                        (isActive
                          ? "text-white dark:text-white font-semibold dark:font-semibold bg-blue-600 px-4 py-2 rounded-full"
                          : "text-gray-500/90 dark:text-white hover:text-blue-600 dark:hover:text-blue-400")
                      }
                    >
                      <span className="text-sm flex gap-4 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        <User />
                        Students
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-4 last:mb-0">
                    <NavLink
                      end
                      to="/Staff"
                      className={({ isActive }) =>
                        "block transition duration-150 truncate" +
                        (isActive
                          ? "text-white dark:text-white font-semibold dark:font-semibold bg-blue-600 px-4 py-2 rounded-full"
                          : "text-gray-500/90 dark:text-white hover:text-blue-600 dark:hover:text-blue-400")
                      }
                    >
                      <span className="text-sm flex gap-4 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        <UserCog />
                        Staff
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-4 last:mb-0">
                    <NavLink
                      end
                      to="/Payments"
                      className={({ isActive }) =>
                        "block transition duration-150 truncate" +
                        (isActive
                          ? "text-white dark:text-white font-semibold dark:font-semibold bg-blue-600 px-4 py-2 rounded-full"
                          : "text-gray-500/90 dark:text-white hover:text-blue-600 dark:hover:text-blue-400")
                      }
                    >
                      <span className="text-sm flex gap-4 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        <BadgeDollarSign />
                        Payments
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-4 last:mb-0">
                    <NavLink
                      end
                      to="/medical"
                      className={({ isActive }) =>
                        "block transition duration-150 truncate" +
                        (isActive
                          ? "text-white dark:text-white font-semibold dark:font-semibold bg-blue-600 px-4 py-2 rounded-full"
                          : "text-gray-500/90 dark:text-white hover:text-blue-600 dark:hover:text-blue-400")
                      }
                    >
                      <span className="text-sm flex gap-4 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        <HeartPulse />
                        Medical
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-4 last:mb-0">
                    <NavLink
                      end
                      to="/renew"
                      className={({ isActive }) =>
                        "block transition duration-150 truncate" +
                        (isActive
                          ? "text-white dark:text-white font-semibold dark:font-semibold bg-blue-600 px-4 py-2 rounded-full"
                          : "text-gray-500/90 dark:text-white hover:text-blue-600 dark:hover:text-blue-400")
                      }
                    >
                      <span className="text-sm flex gap-4 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        <CassetteTape />
                        Renewal
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-4 last:mb-0">
                    <NavLink
                      end
                      to="/exams"
                      className={({ isActive }) =>
                        "block transition duration-150 truncate" +
                        (isActive
                          ? "text-white dark:text-white font-semibold dark:font-semibold bg-blue-600 px-4 py-2 rounded-full"
                          : "text-gray-500/90 dark:text-white hover:text-blue-600 dark:hover:text-blue-400")
                      }
                    >
                      <span className="text-sm flex gap-4 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        <BookOpenCheck />
                        Exams
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-4 last:mb-0">
                    <NavLink
                      end
                      to="/class"
                      className={({ isActive }) =>
                        "block transition duration-150 truncate" +
                        (isActive
                          ? "text-white dark:text-white font-semibold dark:font-semibold bg-blue-600 px-4 py-2 rounded-full"
                          : "text-gray-500/90 dark:text-white hover:text-blue-600 dark:hover:text-blue-400")
                      }
                    >
                      <span className="text-sm flex gap-4 font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        <CalendarCheck2 />
                        Class
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        {/* <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
