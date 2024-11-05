// Import statements for react-router-dom
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CarTaxiFront,
  Gauge,
  Menu,
  User,
  Users,
  BadgeDollarSign,
  HeartPulse,
  CalendarCheck2,
  BookOpenCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useState, useRef, useEffect } from "react";

// Import your content components
import Home from "./Home";
import Students from "./Students";
import Staff from "./Staff";
import Payments from "./Payments";
import Medical from "./Medical";
import Schedules from "./Schedules";
import Exams from "./Exams";

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home"); // Track active nav item
  const sidebarRef = useRef(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Students":
        return <Students />;
      case "Staff":
        return <Staff />;
      case "Payments":
        return <Payments />;
      case "Medical":
        return <Medical />;
      case "Schedules":
        return <Schedules />;
      case "Exams":
        return <Exams />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-20 w-[280px] transform bg-white dark:bg-gray-900 lg:static lg:block lg:w-[280px] lg:translate-x-0 lg:bg-gray-100/40 lg:dark:bg-gray-800/40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:shrink-0 lg:border-r`}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link to="#" className="flex items-center gap-2 font-semibold">
              <CarTaxiFront />
              <p className="font-bold">DSMS</p>
              <span className="sr-only">DSMS</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <button
                onClick={() => setActiveTab("Home")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Gauge />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("Students")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <User />
                Students
              </button>
              <button
                onClick={() => setActiveTab("Staff")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Users />
                Staff
              </button>
              <button
                onClick={() => setActiveTab("Payments")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BadgeDollarSign />
                Payments
              </button>
              <button
                onClick={() => setActiveTab("Medical")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <HeartPulse />
                Medical
              </button>
              <button
                onClick={() => setActiveTab("Schedules")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <CalendarCheck2 />
                Schedules
              </button>
              <button
                onClick={() => setActiveTab("Exams")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BookOpenCheck />
                Exams
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>

          {/* Spacer div to push DropdownMenu to the end */}
          <div className="flex-1"></div>

          {/* Dropdown Menu aligned to the right */}
          <DropdownMenu className="ml-auto">
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 md:p-6">{renderContent()}</main>
      </div>
    </div>
  );
}

